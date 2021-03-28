class ChannelsController < ApplicationController
  def show
    render 'home/index'
  end

  def stream_id
    history = ChannelHistory.find_by(stream_id: params[:stream_id])
    if history.present?
      redirect_to "/#{history.name}"
    else
      redirect_to root_path
    end
  end
end
