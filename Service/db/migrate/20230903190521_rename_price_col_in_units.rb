class RenamePriceColInUnits < ActiveRecord::Migration[7.0]
  def change
    rename_column :units, :price, :price_per_share
  end
end
