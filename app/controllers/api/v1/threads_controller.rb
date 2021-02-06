class Api::V1::ThreadsController < ApplicationController
  def show
    render json: fetch_threads
  end

  private

  def fetch_threads
    Rails.cache.fetch("api/v1/bbs/threads?url=#{params[:url]}/v1", expires_in: 10.seconds) do
      Bbs.new(params[:url]).fetch_threads
    end
  end
end
