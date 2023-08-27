class Portfolio < ApplicationRecord
    belongs_to :user

    has_many :transactions, dependent: :destroy

    validates :name, presence: true, uniqueness: { scope: :user_id }
    validates :settled_cash, numericality: { greater_than_or_equal_to: 0, message: 'must be greater than or equal to 0' }
    validates :buying_power, numericality: { greater_than_or_equal_to: 0, message: 'must be greater than or equal to 0' }
end
