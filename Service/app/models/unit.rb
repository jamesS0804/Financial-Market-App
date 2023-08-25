class Unit < ApplicationRecord
    belongs_to :market, foreign_key: 'market_name', primary_key: 'name'
end
