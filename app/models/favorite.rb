# == Schema Information
#
# Table name: favorites
#
#  id           :integer          not null, primary key
#  channel_name :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :string           not null
#
# Indexes
#
#  index_favorites_on_user_id  (user_id)
#
class Favorite < ApplicationRecord
end
