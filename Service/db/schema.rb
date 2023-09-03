# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_09_03_190939) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "markets", force: :cascade do |t|
    t.integer "name", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "portfolio_units", force: :cascade do |t|
    t.string "symbol"
    t.string "company_name"
    t.decimal "price_per_share"
    t.decimal "quantity"
    t.decimal "amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "portfolio_id", null: false
    t.index ["portfolio_id"], name: "index_portfolio_units_on_portfolio_id"
  end

  create_table "portfolios", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.decimal "buying_power", default: "0.0"
    t.decimal "market_value", default: "0.0"
    t.decimal "settled_cash", default: "0.0"
    t.index ["user_id"], name: "index_portfolios_on_user_id"
  end

  create_table "transactions", force: :cascade do |t|
    t.string "market_order_type", null: false
    t.integer "transaction_type", default: 0, null: false
    t.string "status", null: false
    t.string "symbol", null: false
    t.decimal "quantity", null: false
    t.decimal "price_per_share", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "portfolio_id", null: false
    t.string "market_name"
    t.decimal "amount"
    t.index ["portfolio_id"], name: "index_transactions_on_portfolio_id"
  end

  create_table "units", force: :cascade do |t|
    t.string "symbol"
    t.string "company_name"
    t.string "exchange"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "market_name"
    t.decimal "price_per_share", null: false
    t.decimal "bid", null: false
    t.bigint "volume", null: false
    t.decimal "ask", null: false
    t.decimal "change", null: false
    t.decimal "change_percent", null: false
    t.bigint "average_daily_volume", null: false
    t.string "currency", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.integer "role", default: 0, null: false
    t.string "signup_status", default: "PENDING", null: false
    t.string "jti", null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "portfolio_units", "portfolios"
  add_foreign_key "portfolios", "users"
  add_foreign_key "transactions", "portfolios"
end
