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