class Api::V1::PeercastsController < ApplicationController
  def show
    status = Rails.cache.fetch('api/v1/peercast/show', expires_in: 1.minute) do
      JsonRpc.peercast_api.get_peercast_status
    end
    render json: status
  end
end
