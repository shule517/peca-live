class Api::V1::BbsController < ApplicationController
  def index
    render json: fetch_board
  end

  private

  def fetch_board
    Rails.cache.fetch("api/v1/bbs?url=#{params[:url]}/v1", expires_in: 1.day) do
      Bbs.new(params[:url]).fetch_board
    end
  end
end
