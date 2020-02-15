class Api::V1::ChannelsController < ApplicationController
  def index
    render json: get_channels
  end

  def check_port
    ip = request.ip
    port_no = params[:port_no].presence || "7144"

    sock = TCPSocket.open(ip, port_no)
    pcp_hello_messsage = "pcp\x0a\x04\x00\x00\x00\x01\x00\x00\x00helo\x00\x00\x00\x80"
    sock.write(pcp_hello_messsage)
    response = sock.read
    result = response.start_with?("oleh")
    sock.close
    render json: { check_ip: ip, check_port: port_no, result: result }
  rescue StandardError
    render json: { check_ip: ip, check_port: port_no, result: false }
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
