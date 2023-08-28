class AddMarketNameColumnToUnitForMarketRef < ActiveRecord::Migration[7.0]
  def change
    add_column :units, :market_name, :string
  end
end
