create_table "users", force: :cascade do |t|
  t.string   :uid, null: false
  t.string   :display_name, null: false
  t.text     :photo_url, null: false
  t.timestamps
end
