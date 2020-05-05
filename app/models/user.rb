# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  photo_url  :text             not null
#  uid        :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class User < ApplicationRecord
  has_many :favorites

  def favorite!(channel_name)
    favorites.find_or_create_by!(channel_name: channel_name)
  end
end
