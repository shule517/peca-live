class Api::V1::ChannelsController < ApplicationController
  def index
    render json: get_channels
  end

  def check_port
    ip = params[:host].presence || request.ip
    port_no = params[:port_no].presence || "7144"
    result = PeerCast.port_opened?(ip, port_no)

    render json: { check_ip: ip, check_port: port_no, result: result }
  end

  private

  def get_channels
    Rails.cache.fetch('get_channels', expires_in: 1.minute) do
      peca_tip = "http://#{ENV['PEERCAST_TIP']}"
      api = JsonRpc.new("#{peca_tip}/api/1", ENV['PEERCAST_BASIC_TOKEN'])
      channels = api.update_yp_channels
      channels = channels.select { |channel| visible_channel?(channel) }
      channels
    end
  end

  def visible_channel?(channel)
    return false if channel['channelId'] == '00000000000000000000000000000000'
    # return false unless channel['contentType'] == 'FLV'
    return false if ignore_channel?(channel['name'])
    true
  end

  def ignore_channel?(channel_name)
    %w(isuZuﾋﾟﾁｭｰﾝch なる).include?(channel_name)
  end
end
