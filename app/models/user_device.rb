# == Schema Information
#
# Table name: user_devices
#
#  id         :integer          not null, primary key
#  token      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :string           not null
#
# Indexes
#
#  index_user_devices_on_user_id  (user_id)
#
class UserDevice < ApplicationRecord
end
