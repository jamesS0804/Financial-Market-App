class ChangeDataTypeOfAmountCol < ActiveRecord::Migration[7.0]
  def change
    change_column :portfolio_units, :quantity, :decimal
  end
end
