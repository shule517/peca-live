class Api::V1::Channels::PrivateController < ApplicationController
  def create
    PrivateChannel.find_or_create_by!(name: params[:channel_name])
  end

  def destroy
    channel = PrivateChannel.find_by(name: params[:channel_name])
    channel&.destroy!
  end
end
