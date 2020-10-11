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
class ChannelHistory < ApplicationRecord
end
