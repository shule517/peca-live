class JsonRpc
  def initialize(entry_point)
    @entry_point = entry_point
  end

  def update_yp_channels
    response = command('updateYPChannels')
    channels = response['result']
  end

  private

  def command(method_name)
    result = `curl -H "X-Requested-With: XMLHttpRequest" -H "Content-Type: application/json" -X POST -d '{"jsonrpc": "2.0","id": 6412,"method":"#{method_name}"}' #{entry_point}`
    JSON.parse(result)
  end

  attr_reader :entry_point
end
