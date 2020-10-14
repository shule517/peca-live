# == Schema Information
#
# Table name: private_channels
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  status     :integer          default("secret"), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_private_channels_on_name    (name) UNIQUE
#  index_private_channels_on_status  (status)
#
class PrivateChannel < ApplicationRecord
  enum status: { secret: 0, open: 1 }

  class << self
    def secret?(channel_name)
      secret.where(name: channel_name).exists?
    end
  end
end
