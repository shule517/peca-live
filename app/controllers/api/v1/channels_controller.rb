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
    target_channels = channels.select { |channel| channel['uptime'] < 30 * 60 }
    target_channels.each do |channel|
      # 30分以内に開始した配信を対象に、一度も送ってなければPush通知を送信
      # これでダブり。漏れがなくなるはず！
      Rails.cache.fetch("notification_broadcasting/#{channel['channelId']}", expires_in: 30.minute) do
        notify_broadcasting(channel)
      end
    end
    render json: target_channels
  end

  def record_history
    # 配信履歴の記録(10分ごと)
    channels = get_channels.reject { |channel| yp_channel?(channel) }
    ChannelHistory.record_channels(channels)
    render json: channels
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

  def bump
    json_rpc_api.bump_channel(params[:streamId]) if params[:streamId].present?
  end

  private

  def notify_broadcasting(channel)
    auth_key = 'AAAAsPFBcrY:APA91bGKNFqaPRhwd8BroEdWIbeAXMfnu6Aibicl3CUmBKDM29SmCKeIrq_f3Y3RpUUWJEbsWUzvcbwJOij9E_BGBMFEj0dcsoG3ews_dCcRoFikoDg2OJQTk3xuIA2hJoWIWjp6SExC'
    channel_name = channel['name']

    # お気に入り登録してるユーザーにPush通知する
    send_tos = Favorite.where(channel_name: channel_name).flat_map { |favorite| favorite.user.devices.pluck(:token) }

    link_url = "http://peca.live/channels/#{channel['channelId']}?utm_medium=push"
    channel_detail = channel['genre']
    description = channel['description'].gsub(' - <Open>', '').gsub('<Open>', '').gsub(' - <Free>', '').gsub('<Free>', '').gsub(' - <2M Over>', '').gsub('<2M Over>', '').gsub(' - <Over>', '').gsub('<Over>', '')
    channel_detail += ' - ' if channel_detail.present? && description.present?
    channel_detail += description

    send_tos.each do |send_to|
      `curl -X POST -H "Authorization: key=#{auth_key}" -H "Content-Type: application/json" -d '{ "data": { "title": "#{channel_name} の 配信がはじまった！", "body": "#{channel_detail}", "icon": "pecalive.png", "badge": "favicon.png", "url": "#{link_url}" }, "to": "'#{send_to}'" }' "https://fcm.googleapis.com/fcm/send"`
    end
  end

  def fetch_channels
    Rails.cache.fetch('Api::V1::ChannelsController/fetch_channels', expires_in: 1.minute) do
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
    Rails.cache.fetch('Api::V1::ChannelsController/get_channels', expires_in: 1.minute) do
      json_rpc_api.update_yp_channels
    end
  end

  def json_rpc_api
    JsonRpc.peercast_api
  end

  def visible_channel?(channel)
    return false if yp_channel?(channel)
    return false if ignore_channel?(channel['name'])
    true
  end

  def yp_channel?(channel)
    channel['channelId'] == '00000000000000000000000000000000'
  end

  def ignore_channel?(channel_name)
    @private_channel_names.include?(channel_name)
  end
end
