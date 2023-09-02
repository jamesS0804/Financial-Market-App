class ChangeSignupStatusColDefaultInUsers < ActiveRecord::Migration[7.0]
  def change
    change_column_default :users, :signup_status, "PENDING"
  end
end
