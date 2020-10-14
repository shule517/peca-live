create_table :users, force: :cascade do |t|
  t.string   :uid, null: false
  t.string   :name, null: false
  t.text     :photo_url, null: false
  t.timestamps
end
add_index :users, :uid, unique: true

create_table :user_devices, force: :cascade do |t|
  t.string   :user_id, null: false
  t.string   :token, null: false
  t.timestamps
end
add_index :user_devices, :user_id

create_table :private_channels, force: :cascade do |t|
  t.string   :name, null: false
  t.integer  :status, null: false, default: 0
  t.timestamps
end
add_index :private_channels, :name, unique: true

create_table :favorites, force: :cascade do |t|
  t.string   :user_id, null: false
  t.string   :channel_name, null: false
  t.timestamps
end
add_index :favorites, :user_id
add_index :favorites, %i(user_id channel_name), unique: true

create_table :channel_histories, force: :cascade do |t|
  t.string   :stream_id, null: false
  t.string   :name, null: false
  t.string   :yellow_page, null: false
  t.string   :tracker
  t.string   :contact_url
  t.string   :genre
  t.string   :description
  t.string   :comment
  t.integer  :bitrate, null: false
  t.string   :content_type
  t.string   :track_title
  t.string   :album
  t.string   :creator
  t.string   :track_url
  t.integer  :listeners, null: false
  t.integer  :relays, null: false
  t.integer  :uptime, null: false
  t.datetime :latest_lived_at, null: false
  t.timestamps
end
add_index :channel_histories, :stream_id, unique: true
