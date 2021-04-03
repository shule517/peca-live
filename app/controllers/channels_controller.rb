class ChannelsController < ApplicationController
  def show
    @history = ChannelHistory.where(name: params[:channel_name]).order(latest_lived_at: :desc).first
    @title = "#{params[:channel_name]} - ぺからいぶ！"
    @description = @history.detail if @history.present?
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
