class Api::V1::ChannelsController < ApplicationController
  before_action :set_private_channel_names

  def index
    channels = fetch_channels
    favorites = Array(current_user&.favorites)
    channels.map { |hash| hash[:favorited] = favorites.any? { |favorite| favorite.channel_name == hash['name'] } }
    render json: channels
  end

  def notification_broadcasting
    # 配信開始の通知(10分ごと)
    channels = fetch_channels
    target_channels = channels.select { |channel| channel['uptime'] < 10 * 60 }
    target_channels.each { |channel| notify_broadcasting(channel) }
    render json: target_channels
  end

  def broadcasting
    ip = forwarded_for.presence || request.ip
    channels = get_channels.select { |channel| channel['tracker'].start_with?(ip) || channel['creator'].start_with?(ip) }

    render json: channels.map { |channel| channel['private'] = PrivateChannel.where(name: channel['name']).exists?; channel }
  end

  def check_port
    ip = params[:host].presence || forwarded_for.presence || request.ip
    port_no = params[:port_no].presence || "7144"
    result = PeerCast.port_opened?(ip, port_no)

    render json: { result: result, check_ip: ip, check_port: port_no, request_ip: request.ip, request_remote_ip: request.remote_ip, forward: request.env["HTTP_X_FORWARDED_FOR"], remote_addr: request.remote_addr, env_remote_addr: request.env['REMOTE_ADDR']}
  end

  private

  def notify_broadcasting(channel)
    auth_key = 'AAAAsPFBcrY:APA91bGKNFqaPRhwd8BroEdWIbeAXMfnu6Aibicl3CUmBKDM29SmCKeIrq_f3Y3RpUUWJEbsWUzvcbwJOij9E_BGBMFEj0dcsoG3ews_dCcRoFikoDg2OJQTk3xuIA2hJoWIWjp6SExC'
    channel_name = channel['name']

    # お気に入り登録してるユーザーにPush通知する
    send_tos = Favorite.where(channel_name: channel_name).map { |favorite| favorite.user.devices.pluck(:token) }

    link_url = "http://peca.live/channels/#{channel['channelId']}"
    channel_detail = channel['genre']
    description = channel['description'].gsub(' - <Open>', '').gsub('<Open>', '').gsub(' - <Free>', '').gsub('<Free>', '').gsub(' - <2M Over>', '').gsub('<2M Over>', '').gsub(' - <Over>', '').gsub('<Over>', '')
    channel_detail += ' - ' if channel_detail.present? && description.present?
    channel_detail += description

    send_tos.each do |send_to|
      `curl -X POST -H "Authorization: key=#{auth_key}" -H "Content-Type: application/json" -d '{ "data": { "title": "#{channel_name} の 配信がはじまった！", "body": "#{channel_detail}", "icon": "pecalive.png", "badge": "favicon.png", "url": "#{link_url}" }, "to": "'#{send_to}'" }' "https://fcm.googleapis.com/fcm/send"`
    end
  end

  def fetch_channels
    Rails.cache.fetch('api/v1/channels/index', expires_in: 1.minute) do
      get_channels.select { |channel| visible_channel?(channel) }
    end
  end

  def set_private_channel_names
    @private_channel_names = PrivateChannel.all.pluck(:name)
  end

  def forwarded_for
    forwarded = request.env['HTTP_X_FORWARDED_FOR']
    return if forwarded.blank?
    forwarded.split(",").first
  end

  def get_channels
    Rails.cache.fetch('get_channels', expires_in: 1.minute) do
      peca_tip = "http://#{ENV['PEERCAST_TIP']}"
      api = JsonRpc.new("#{peca_tip}/api/1", ENV['PEERCAST_BASIC_TOKEN'])
      channels = api.update_yp_channels
      channels
    end
  end

  def visible_channel?(channel)
    return false if channel['channelId'] == '00000000000000000000000000000000'
    return false if ignore_channel?(channel['name'])
    true
  end

  def ignore_channel?(channel_name)
    @private_channel_names.include?(channel_name)
  end
end
