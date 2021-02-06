# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 0) do

  create_table "channel_histories", force: :cascade do |t|
    t.string "stream_id", null: false
    t.string "name", null: false
    t.string "yellow_page", null: false
    t.string "tracker"
    t.string "contact_url"
    t.string "genre"
    t.string "description"
    t.string "comment"
    t.integer "bitrate", null: false
    t.string "content_type"
    t.string "track_title"
    t.string "album"
    t.string "creator"
    t.string "track_url"
    t.integer "listeners", null: false
    t.integer "relays", null: false
    t.integer "uptime", null: false
    t.datetime "latest_lived_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["stream_id"], name: "index_channel_histories_on_stream_id", unique: true
  end

  create_table "favorites", force: :cascade do |t|
    t.string "user_id", null: false
    t.string "channel_name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "channel_name"], name: "index_favorites_on_user_id_and_channel_name", unique: true
    t.index ["user_id"], name: "index_favorites_on_user_id"
  end

  create_table "private_channels", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "status", default: 0, null: false
    t.index ["name"], name: "index_private_channels_on_name", unique: true
    t.index ["status"], name: "index_private_channels_on_status"
  end

  create_table "user_devices", force: :cascade do |t|
    t.string "user_id", null: false
    t.string "token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_devices_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "uid", null: false
    t.string "name", null: false
    t.text "photo_url", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["uid"], name: "index_users_on_uid", unique: true
  end

end
