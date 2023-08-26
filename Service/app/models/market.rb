class Market < ApplicationRecord
    enum name: [ :STOCK, :FOREX, :CRYPTO ]

    has_many :transactions, foreign_key: 'market_name', primary_key: 'name'
    has_many :units, foreign_key: 'market_name'
end
