class AddColumnsToPortfolios < ActiveRecord::Migration[7.0]
  def change
    add_column :portfolios, :buying_power, :decimal, default: 0
    add_column :portfolios, :market_value, :decimal, default: 0
    add_column :portfolios, :settled_cash, :decimal, default: 0
  end
end
