class Api::V1::CommentsController < ApplicationController
  def index
    render json: fetch_comments
  end

  private

  def fetch_comments
    Rails.cache.fetch("api/v1/comments?url=#{params[:url]}", expires_in: 1.minute) do
      Bbs.new(params[:url]).fetch_comments.last(30)
    end
  end
end
