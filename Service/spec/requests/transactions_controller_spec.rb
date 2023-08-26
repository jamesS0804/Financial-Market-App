require 'rails_helper'

RSpec.describe "TransactionsController", type: :request do
  before(:each) do
    market = Market.create(name: 'STOCK')
  end

  describe "POST /process_limit_order_buy" do

  end

  describe "POST /process_limit_order_sell" do

  end

  describe "POST /process_market_order_buy" do
    context "when a trader wants to buy stock market order" do
      it "should send a JSON response with a success message and transaction receipt" do
        user = User.create(email: 'user1@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "TRADER", confirmed_at: Date.today)
        portfolio = user.portfolios.create(name: 'test portfolio')

        post "/portfolios/#{portfolio.id}/transactions/market_order/buy", params: { 
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
        
        puts JSON.parse(response.body).inspect

        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe "POST /process_market_order_sell" do

  end
end