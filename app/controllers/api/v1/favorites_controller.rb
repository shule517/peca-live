class Api::V1::FavoritesController < ApplicationController
  def index
    if current_user.blank?
      render json: [] and return
    end
    render json: current_user&.favorites.select(%i(id channel_name)).to_json
  end

  def show
    if current_user.blank?
      render json: {} and return
    end
    favorite = current_user&.favorites.where(id: params[:id]).select(%i(id channel_name))
    render json: favorite.to_json
  end

  def create
    return if current_user.blank?
    current_user&.favorite!(params[:channel_name])
  end

  def destroy
    return if current_user.blank?
    current_user&.favorites.find_by(channel_name: params[:channel_name])&.destroy!
  end
end
