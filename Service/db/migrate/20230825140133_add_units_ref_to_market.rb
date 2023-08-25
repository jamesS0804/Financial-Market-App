class AddUnitsRefToMarket < ActiveRecord::Migration[7.0]
  def change
    add_reference :units, :market, foreign_key: true
  end
end
