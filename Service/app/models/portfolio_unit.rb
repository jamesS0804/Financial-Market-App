class PortfolioUnit < ApplicationRecord
    belongs_to :portfolio

    validates :symbol, presence: true, uniqueness: { scope: :portfolio_id }
    validates :company_name, presence: true, uniqueness: { scope: :portfolio_id }
    validates :price_per_share, presence: true
    validates :quantity, presence: true, numericality: { greater_than_or_equal_to: 0, message: "must be greater than 0" }
    validates :amount, presence: true, numericality: { greater_than_or_equal_to: 0, message: "must be greater than 0" }
end
