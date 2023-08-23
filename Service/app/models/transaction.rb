class Transaction < ApplicationRecord
    belongs_to :portfolio
    belongs_to :market, foreign_key: 'market_name', primary_key: 'name'

    enum transaction_type: [:BUY, :SELL]
end
