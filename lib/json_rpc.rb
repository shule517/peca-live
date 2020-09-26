class JsonRpc
  def initialize(entry_point, basic_token)
    @entry_point = entry_point
    @basic_token = basic_token
  end

  def update_yp_channels
    response = command('updateYPChannels')
    channels = response['result']
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
