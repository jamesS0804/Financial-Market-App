class CreateMarkets < ActiveRecord::Migration[7.0]
  def change
    create_table :markets do |t|
      t.integer :name, default: 0, null: false
      t.timestamps null: false
    end
  end
end
