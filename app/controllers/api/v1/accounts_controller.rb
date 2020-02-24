class Api::V1::AccountsController < ApplicationController
  def create
    return if current_user.present?

    authenticate_with_http_token do |token, options|
      decoded_token = FirebaseHelper::Auth.verify_id_token(token)&.with_indifferent_access
      return if decoded_token.blank?

      uid = decoded_token[:uid]
      payload = decoded_token[:decoded_token][:payload]
      name = payload[:name]
      photo_url = payload[:picture]

      pp uid: uid, name: name, photo_url: photo_url
      user = User.find_or_create_by!(uid: uid, name: name, photo_url: photo_url)

      log_in(user)
    end
  end

  def sign_out
    log_out
  end
end
