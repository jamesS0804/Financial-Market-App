class Transaction < ApplicationRecord
    belongs_to :portfolio
    belongs_to :market
end
