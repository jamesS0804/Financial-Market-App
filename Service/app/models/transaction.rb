class Transaction < ApplicationRecord
    belongs_to :portfolio
    belongs_to :market, foreign_key: 'market_name', primary_key: 'name'

    enum transaction_type: [ :BUY, :SELL ]

    validates :price, numericality: { greater_than_or_equal_to: 0, message: 'must be greater than or equal to 0' }
    validates :quantity, numericality: {greater_than: 0, message: 'must be greater than 0'}
end
