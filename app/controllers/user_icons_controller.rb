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
      return response unless response.code == 404 # Twitterアイコン
    end

    fetch_default_icon # デフォルトアイコン
  end

  def extract_twitter_id
    url = "http://bbs.jpnkn.com/#{params[:jpnkn_id]}/"
    response = Net::HTTP.get(URI.parse(url))
    matches = /https:\/\/twitter\.com\/([0-9a-zA-Z_]+)\//.match(response)

    if matches.present?
      matches[1]
    end
  end

  def fetch_twitter_icon(twitter_id)
    twitter_icon_url = "http://www.paper-glasses.com/api/twipi/#{twitter_id}/original"
    client = HTTPClient.new
    client.get(twitter_icon_url, follow_redirect: true)
  end

  def fetch_default_icon
    client = HTTPClient.new
    client.get('https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png', follow_redirect: true)
  end
end
