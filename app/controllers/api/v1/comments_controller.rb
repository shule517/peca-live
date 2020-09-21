class Api::V1::CommentsController < ApplicationController
  def index
    render json: fetch_comments
  end

  private

  def fetch_comments
    bbs = Bbs.new(params[:url])

    if bbs.shitaraba?
      Rails.cache.fetch("api/v1/comments?url=#{params[:url]}", expires_in: 1.minute) do
        bbs.fetch_comments
      end
    else
      {}
    end
  end
end
