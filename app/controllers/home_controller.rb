class HomeController < ApplicationController
  def index
  end

  def user_devices
    if current_user.present? && params[:token].present?
      current_user.devices.create(token: params[:token])

      # 登録したデバイスにお試しPush通知を送る
      current_user.devices.reload.each do |device|
        NotificationPush.new.notify(title: 'お気に入り配信を通知します！', body: 'ぺからいぶ！', send_to: device.token)
      end
    end

    redirect_to root_path
  end
end
