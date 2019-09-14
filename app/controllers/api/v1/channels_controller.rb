class Api::V1::ChannelsController < ApplicationController
  def index
    render json: get_channels
  end

  private

  def get_channels
    Rails.cache.fetch('get_channels', expires_in: 1.minute) do
      tp_response = get("http://temp.orz.hm/yp/index.txt")
      sp_response = get("http://bayonet.ddo.jp/sp/index.txt")
      tp_response + sp_response
    end
  end

  def get(url)
    uri = URI.parse(url)
    response = Net::HTTP.get_response(uri)
    response.body.force_encoding('UTF-8')
  end
end
