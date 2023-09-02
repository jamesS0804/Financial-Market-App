class AddReferenceFromPortfolioUnitToPortfolio < ActiveRecord::Migration[7.0]
  def change
    add_reference :portfolio_units, :portfolio, null: false, foreign_key: true
  end
end
