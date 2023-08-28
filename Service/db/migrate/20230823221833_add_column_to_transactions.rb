class AddColumnToTransactions < ActiveRecord::Migration[7.0]
  def change
    add_column :transactions, :market_name, :string
  end
end
