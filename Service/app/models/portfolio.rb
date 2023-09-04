class Portfolio < ApplicationRecord
    belongs_to :user

    has_many :transactions, dependent: :destroy
    has_many :portfolio_units, dependent: :destroy

    validates :name, presence: true, uniqueness: { scope: :user_id }
    validates :settled_cash, numericality: { greater_than_or_equal_to: 0, message: 'must be greater than or equal to 0' }
    validates :buying_power, numericality: { greater_than_or_equal_to: 0, message: 'must be greater than or equal to 0' }

    def has_enough_balance?(price_per_share, quantity)
        required_cash = price_per_share.to_f * quantity.to_f
        buying_power >= required_cash
    end

    def has_enough_unit?(symbol, quantity)
        portfolio_unit = portfolio_units.find_by(symbol: symbol)
        if !portfolio_unit
            return false 
        end
        portfolio_unit.quantity >= quantity.to_f 
    end

    def buy_unit(symbol, price_per_share, quantity)
        amount = price_per_share* quantity

        existing_unit = portfolio_units.find_by(symbol: symbol)

        if existing_unit

            existing_unit.update(
                price_per_share: price_per_share,
                quantity: existing_unit.quantity + quantity,
                amount: existing_unit.amount + amount,
            )
        else
            unit = Unit.find_by(symbol: symbol)

            portfolio_units.create(
                symbol: symbol,
                company_name: unit.company_name,
                price_per_share: price_per_share,
                quantity: quantity,
                amount: amount
            )
        end

        update_portfolio(amount)
    end

    def sell_unit(symbol, price_per_share, quantity)
        amount = price_per_share * quantity

        existing_unit = portfolio_units.find_by(symbol: symbol)
        remaining_quantity = existing_unit.quantity - quantity

        if remaining_quantity == 0
            existing_unit.destroy
        else
            existing_unit.update(
                price_per_share: price_per_share,
                quantity: remaining_quantity,
                amount: existing_unit.amount - amount,
            )
        end

        update_portfolio(-amount)
    end

    private

    def update_portfolio(amount)
        self.market_value += amount
        self.settled_cash -= amount
        self.buying_power -= amount

        save
    end
end
