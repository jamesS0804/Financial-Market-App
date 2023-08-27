require 'rails_helper'

RSpec.describe "TransactionsController", type: :request do
  let(:user) { User.create(email: 'user1@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "TRADER", confirmed_at: Date.today) }
  before(:each) do
    market = Market.create(name: 'STOCK')
    @portfolio = user.portfolios.create(name: 'test portfolio', settled_cash: 1000.00, buying_power: 1000.00, market_value: 500.00)
  end

  describe "POST /process_limit_order_buy" do

  end

  describe "POST /process_limit_order_sell" do

  end

  describe "POST /process_market_order_buy" do
    context "when a trader wants to buy stock market order" do
      it "should send a JSON response with a success message and transaction receipt" do
        post "/portfolios/#{@portfolio.id}/transactions/market_order/buy", params: { 
          transaction: {
              market_name: 'STOCK',
              market_order_type: 'MARKET',
              transaction_type: 'BUY',
              status: 'FILLED',
              symbol: 'AAPL',
              quantity: 100,
              price: 150.00
            } 
        }
        
        expect(response).to have_http_status(:ok)

        transaction = Transaction.last
        expect(transaction['market_name']).to eq('STOCK')
        expect(transaction['market_order_type']).to eq('MARKET')
        expect(transaction['transaction_type']).to eq('BUY')
        expect(transaction['status']).to eq('FILLED')
        expect(transaction['symbol']).to eq('AAPL')
        expect(transaction['quantity']).to eq(100)
        expect(transaction['price']).to eq(150.00)

        portfolio = Portfolio.find(@portfolio.id)

        expect(portfolio['buying_power']).to eq(850.00)
        expect(portfolio['settled_cash']).to eq(850.00)
        expect(portfolio['market_value']).to eq(650.00)
      end
    end
  end

  describe "POST /process_market_order_sell" do

  end
end