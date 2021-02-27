require 'open-uri'

class UserIconsController < ApplicationController
  def show
    response = fetch_icon
    send_data response.body, type: response.content_type, disposition: 'inline'
  end

  private

  def fetch_icon
    twitter_id = extract_twitter_id
    if (twitter_id.present?)
      response = fetch_twitter_icon(twitter_id)
      return response if response.present? && response.code != 404 # Twitterアイコン
    end

    fetch_default_icon # デフォルトアイコン
  end

  def extract_twitter_id
    Rails.cache.fetch("extract_twitter_id/#{params[:jpnkn_id]}", expires_in: 1.day) do
      url = "http://bbs.jpnkn.com/#{params[:jpnkn_id]}/"
      response = Net::HTTP.get(URI.parse(url))
      matches = /https:\/\/twitter\.com\/([0-9a-zA-Z_]+)\//.match(response)

      if matches.present?
        matches[1]
      end
    end
  end

  def fetch_twitter_icon(twitter_id)
    twitter_icon_url = twitter_profile_image_url(twitter_id)
    return if twitter_icon_url.blank?
    client = HTTPClient.new
    client.get(twitter_icon_url, follow_redirect: true)
  end

  def twitter_profile_image_url(twitter_id)
    Rails.cache.fetch("twitter_profile_image_url(#{twitter_id})", expires_in: 1.day) do
      command = "curl --request GET --url 'https://api.twitter.com/1.1/users/show.json?screen_name=#{twitter_id}' --header 'authorization: Bearer #{ENV['TWITTER_API_BEARER']}'"
      data = `#{command}`
      json = JSON.parse(data)
      json['profile_image_url']
    end
  end

  def fetch_default_icon
    client = HTTPClient.new
    client.get('https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png', follow_redirect: true)
  end
end
