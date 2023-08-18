class AddTransactionRefToMarkets < ActiveRecord::Migration[7.0]
  def change
    add_reference :transactions, :markets, null: false, foreign_key: true
  end
end
