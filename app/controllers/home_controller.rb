class HomeController < ApplicationController
  def index
  end

  def user_devices
    if current_user.present? && params[:token].present?
      current_user.devices.create(token: params[:token])
    end
    redirect_to root_path
  end
end
