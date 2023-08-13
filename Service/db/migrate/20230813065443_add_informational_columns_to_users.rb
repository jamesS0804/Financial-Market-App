class AddInformationalColumnsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :first_name, :string, null: false
    add_column :users, :last_name, :string, null: false
    add_column :users, :role, :string, null: false
    add_column :users, :signup_status, :string, null: false, default: "pending"
  end
end
