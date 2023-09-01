class ChangePriceColumnToPricePerShare < ActiveRecord::Migration[7.0]
  def change
    rename_column :transactions, :price, :price_per_share
  end
end
