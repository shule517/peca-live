# == Schema Information
#
# Table name: channel_histories
#
#  id              :integer          not null, primary key
#  album           :string
#  bitrate         :integer          not null
#  comment         :string
#  contact_url     :string
#  content_type    :string
#  creator         :string
#  description     :string
#  genre           :string
#  latest_lived_at :datetime         not null
#  listeners       :integer          not null
#  name            :string           not null
#  relays          :integer          not null
#  track_title     :string
#  track_url       :string
#  tracker         :string
#  uptime          :integer          not null
#  yellow_page     :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  stream_id       :string           not null
#
# Indexes
#
#  index_channel_histories_on_stream_id  (stream_id) UNIQUE
#
class ChannelHistory < ApplicationRecord
  validates :stream_id, uniqueness: true, presence: true
  validates :name, presence: true
  validates :listeners, presence: true
  validates :relays, presence: true
  validates :uptime, presence: true
  validates :latest_lived_at, presence: true
  validates :yellow_page, presence: true

  scope :broadcast_from, -> (ip) { where('tracker LIKE ? OR creator LIKE ?', "#{ip}%", "#{ip}%") }

  class << self
    def record_channels(channels)
      channels.each { |channel| record_channel(channel) }
    end

    def record_channel(channel)
      hash = {
        stream_id: channel['channelId'],
        name: channel['name'],
        yellow_page: channel['yellowPage'],
        tracker: channel['tracker'],
        contact_url: channel['contactUrl'],
        genre: channel['genre'],
        description: channel['description'],
        comment: channel['comment'],
        bitrate: channel['bitrate'],
        content_type: channel['contentType'],
        track_title: channel['trackTitle'],
        album: channel['album'],
        creator: channel['creator'],
        track_url: channel['trackUrl'],
        listeners: channel['listeners'],
        relays: channel['relays'],
        uptime: channel['uptime'],
        latest_lived_at: Time.zone.now
      }
      history = find_by(stream_id: channel['channelId'])
      if history.present?
        history.update!(hash)
      else
        create!(hash)
      end
    end
  end

  def description_no_status
    description.gsub(/[ -]*<(Open|Free|2M Over|Over)>/, '')
  end

  def detail
    desc = description_no_status
    channel_detail = genre
    channel_detail += ' - ' if channel_detail.present? && desc.present?
    channel_detail += desc
    channel_detail
  end
end
