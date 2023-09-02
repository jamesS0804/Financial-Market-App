class CreatePortfolioUnits < ActiveRecord::Migration[7.0]
  def change
    create_table :portfolio_units do |t|
      t.string :symbol
      t.string :company_name
      t.decimal :price_per_share
      t.integer :quantity
      t.decimal :amount

      t.timestamps
    end
  end
end
