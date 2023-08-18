class CreateTransactions < ActiveRecord::Migration[7.0]
  def change
    create_table :transactions do |t|
      t.string :market_order_type, null: false
      t.string :transaction_type, null: false
      t.string :status, null: false
      t.string :symbol, null: false
      t.integer :quantity, null: false
      t.decimal :price, null: false
      t.timestamps null: false
    end
  end
end
