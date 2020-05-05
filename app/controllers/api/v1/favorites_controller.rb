class Api::V1::FavoritesController < ApplicationController
  def index
    render json: current_user.favorites.select(%i(id channel_name)).to_json
  end

  def show
    favorite = current_user.favorites.where(id: params[:id]).select(%i(id channel_name))
    render json: favorite.to_json
  end

  def create
    current_user.favorite!(params[:channel_name])
  end

  def destroy
    current_user.favorites.find_by(channel_name: params[:channel_name])&.destroy!
  end
end
