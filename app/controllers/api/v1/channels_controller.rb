class Api::V1::ChannelsController < ApplicationController
  def index
    tp_response = get("http://temp.orz.hm/yp/index.txt")
    sp_response = get("http://bayonet.ddo.jp/sp/index.txt")
    render json: (tp_response + sp_response)
  end

  private

  def get(url)
    uri = URI.parse(url)
    response = Net::HTTP.get_response(uri)
    response.body.force_encoding('UTF-8')
  end
end
