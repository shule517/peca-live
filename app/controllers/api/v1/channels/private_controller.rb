class Api::V1::Channels::PrivateController < ApplicationController
  # api/v1/channels/private/しっかりシュールｃｈ
  def show
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
end
