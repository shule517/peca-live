class Api::V1::Channels::PrivateController < ApplicationController
  # api/v1/channels/private/しっかりシュールｃｈ
  def show
    ip = forwarded_for.presence || request.ip
    head :ok and return unless ChannelHistory.where(name: params[:channel_name]).from_ip(ip).exists?

    channel = PrivateChannel.find_by(name: params[:channel_name])

    if channel.present?
      if channel.secret?
        channel.open!
      else
        channel.secret!
      end
    else
      PrivateChannel.find_or_create_by!(name: params[:channel_name])
    end

    head :ok
  end

  private

  def forwarded_for
    forwarded = request.env['HTTP_X_FORWARDED_FOR']
    return if forwarded.blank?
    forwarded.split(",").first
  end
end
