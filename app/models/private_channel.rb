# == Schema Information
#
# Table name: private_channels
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_private_channels_on_name  (name) UNIQUE
#
class PrivateChannel < ApplicationRecord
end
