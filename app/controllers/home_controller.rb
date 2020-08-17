class HomeController < ApplicationController
  def index
  end

  def user_devices
    redirect_to root_path if current_user.blank? || params[:token].blank?
    current_user.devices.create(token: params[:token])
    redirect_to root_path
  end
end
