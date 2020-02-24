create_table :users, force: :cascade do |t|
  t.string   :uid, null: false
  t.string   :name, null: false
  t.text     :photo_url, null: false
  t.timestamps
end

create_table :private_channels, force: :cascade do |t|
  t.string   :name, null: false
  t.timestamps
end
add_index :private_channels, :name, unique: true
