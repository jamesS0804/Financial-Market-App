require 'rails_helper'

RSpec.describe Portfolio, type: :model do
  describe "associations" do
    it { should have_many(:transactions).dependent(:destroy) }
    it { should belong_to(:user) }
  end

  describe "validations" do
    portfolio_params = { name: "Test Portfolio" }

    it "should not be valid without name" do
      portfolio = Portfolio.create(portfolio_params)
      portfolio[:name] = nil
      expect(portfolio).to_not be_valid
    end
    it "should not be valid if it's not unique" do
      original_portfolio = Portfolio.create(portfolio_params)
      duplicate_portfolio = Portfolio.create(portfolio_params)
      expect(duplicate_portfolio).to_not be_valid
    end
  end

  describe "method buy_unit" do
    context "when a transaction is successful and the portfolio's portfolio_units and balance needs to be updated" do
      let(:user) { User.create({ email: 'user@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "TRADER", confirmed_at: '2023-08-27T00:00:00.000Z', signup_status: 'APPROVED' }) }
      let(:default_portfolio) { user.portfolios.first }
      let(:symbol) { 'AAPL' }
      let(:second_symbol) { 'GOOGL' }
      let(:quantity) { 2 }
      let(:price_per_share) { 150.00 }
      before(:each) do
        market = Market.create(name: 'STOCK')
        appl_unit = Unit.create(
          symbol: "AAPL",
          company_name: "Apple Inc.",
          exchange: "NasdaqGS",
          market_name: "STOCK",
          price_per_share: 0.17638e3,
          bid: 0.0,
          volume: 51449594,
          ask: 0.0,
          change: 0.22299957e1,
          change_percent: 0.12643132e1,
          average_daily_volume: 50892360,
          currency: "USD"
        )
        @googl_unit = Unit.create(
          symbol: "GOOGL",
          company_name: "Google Inc.",
          exchange: "NasdaqGS",
          market_name: "STOCK",
          price_per_share: 0.17638e3,
          bid: 0.0,
          volume: 51449594,
          ask: 0.0,
          change: 0.22299957e1,
          change_percent: 0.12643132e1,
          average_daily_volume: 50892360,
          currency: "USD"
        )
      end
      context "when the portfolio already exists in the portfolio_units" do
        it "should update the existing portfolio_unit's quantity and amount" do
          existing_portfolio_unit = default_portfolio.portfolio_units.create(
            symbol: symbol,
            company_name: "Apple Inc.",
            price_per_share: price_per_share,
            quantity: 3,
            amount: 200
          )
          default_portfolio.buy_unit(symbol, quantity, price_per_share)

          default_portfolio.reload

          portfolio_unit = default_portfolio.portfolio_units.find_by(symbol: symbol)

          expect(portfolio_unit).to be_present
          expect(portfolio_unit.quantity).to eq(5)
          expect(portfolio_unit.amount).to eq(500)
        end
      end
      context "when the portfolio doesn't exist in the portfolio_units" do
        it "should create a new portfolio unit with the price_per_share, quantity, and amount" do
          default_portfolio.buy_unit(second_symbol, quantity, price_per_share)

          default_portfolio.reload

          portfolio_unit = default_portfolio.portfolio_units.find_by(symbol: second_symbol)

          expect(portfolio_unit).to be_present
          expect(portfolio_unit.quantity).to eq(quantity)
          expect(portfolio_unit.amount).to eq(price_per_share * quantity)
        end
      end
    end
  end
end
