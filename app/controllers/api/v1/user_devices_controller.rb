class Api::V1::UserDevicesController < ApplicationController
  def create
    user = User.find(uid: params[:uid])
    user.devices.create!(token: params[:token])
  end
end
