class Api::V1::AccountsController < ApplicationController
  def create
    authenticate_with_http_token do |token, options|
      decoded_token = FirebaseHelper::Auth.verify_id_token(token)&.with_indifferent_access
      return if decoded_token.blank?

      uid = decoded_token[:uid]
      payload = decoded_token[:decoded_token][:payload]
      name = payload[:name]
      photo_url = payload[:picture]

      pp uid: uid, name: name, photo_url: photo_url
      User.create!(uid: uid, name: name, photo_url: photo_url)
    end
  end
end
