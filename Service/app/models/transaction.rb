class Transaction < ApplicationRecord
    belongs_to :portfolio
    belongs_to :market, foreign_key: 'market_name', primary_key: 'name'

    before_save :calculate_amount

    enum transaction_type: [ :BUY, :SELL ]

    validates :price_per_share, numericality: { greater_than_or_equal_to: 0, message: 'must be greater than or equal to 0' }
    validates :quantity, numericality: {greater_than: 0, message: 'must be greater than 0'}

    private
 
    def calculate_amount
        self.amount = price_per_share * quantity
    end
end
