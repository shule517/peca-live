class JsonRpc
  def self.peercast_api
    peca_tip = "http://#{ENV['PEERCAST_TIP']}"
    JsonRpc.new("#{peca_tip}/api/1", ENV['PEERCAST_BASIC_TOKEN'])
  end

  def initialize(entry_point, basic_token)
    @entry_point = entry_point
    @basic_token = basic_token
  end

  def get_peercast_status
    status = get_status
    global_relay_end_point = status['globalRelayEndPoint']
    host = global_relay_end_point&.first
    port_no = global_relay_end_point&.last
    { host: host, portNo: port_no, uptime: status['uptime'] }
  end

  def get_status
    response = command('getStatus')
    response['result']
  end

  def update_yp_channels
    response = command('updateYPChannels')
    response['result']
  end

  def bump_channel(channel_id)
    response = command('bumpChannel', channelId: channel_id)
    response['result']
  end

  private

  def command(method_name, params = nil)
    hash = {
        jsonrpc: "2.0",
        id: 6412,
        method: method_name,
    }
    hash[:params] = params if params.present?

    result = `curl -H "Authorization: Basic #{basic_token}" -H "X-Requested-With: XMLHttpRequest" -H "Content-Type: application/json" -X POST -d '#{hash.to_json}' #{entry_point}`
    JSON.parse(result)
  end

  attr_reader :entry_point, :basic_token
end