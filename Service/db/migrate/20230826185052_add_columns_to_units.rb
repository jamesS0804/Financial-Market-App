class AddColumnsToUnits < ActiveRecord::Migration[7.0]
  def change
    add_column :units, :price, :decimal, null: false
    add_column :units, :bid, :decimal, null: false
    add_column :units, :volume, :bigint, null: false
    add_column :units, :ask, :decimal, null: false
    add_column :units, :change, :decimal, null: false
    add_column :units, :change_percent, :decimal, null: false
    add_column :units, :average_daily_volume, :bigint, null: false
    add_column :units, :currency, :string, null: false
  end
end
