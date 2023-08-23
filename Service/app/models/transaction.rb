class Transaction < ApplicationRecord
    belongs_to :portfolio
    belongs_to :market

    enum transaction_type: [:BUY, :SELL]
end
