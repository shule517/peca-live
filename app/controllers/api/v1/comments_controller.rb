class Api::V1::CommentsController < ApplicationController
  def show
    render json: fetch_comments
  end

  private

  def fetch_comments
    Rails.cache.fetch("api/v1/bbs/comments?url=#{params[:url]}/v1", expires_in: 10.seconds) do
      Bbs.new(params[:url]).fetch_comments.last(30)
    end
  end
end
