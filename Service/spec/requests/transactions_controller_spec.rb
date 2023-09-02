require 'rails_helper'

RSpec.describe "TransactionsController", type: :request do
  let(:user) { User.create(email: 'user1@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "TRADER", confirmed_at: Date.today) }
  before(:each) do
    sign_in(user)
    market = Market.create(name: 'STOCK')
    unit = Unit.create(symbol: "AAPL",
      name: "Apple Inc.",
      exchange: "NasdaqGS",
      market_name: "STOCK",
      price: 0.17638e3,
      bid: 0.0,
      volume: 51449594,
      ask: 0.0,
      change: 0.22299957e1,
      change_percent: 0.12643132e1,
      average_daily_volume: 50892360,
      currency: "USD")
    @portfolio = user.portfolios.create(name: 'test portfolio', settled_cash: 1000.00, buying_power: 1000.00, market_value: 500.00)
    existing_unit = @portfolio.portfolio_units.create(
      symbol: 'AAPL',
      company_name: 'Apple Inc.',
      price_per_share: 150,
      quantity: 2,
      amount: 300
    )
  end
  
  describe "Stock Market orders" do
    before(:each) do
      @transaction_params = { 
        transaction: {
          market_name: 'STOCK',
          market_order_type: 'MARKET',
          transaction_type: 'BUY',
          status: 'FILLED',
          symbol: 'AAPL',
          quantity: 2,
          price_per_share: 150.00
        }
      }
    end
    describe "POST /process_market_order_buy" do
      context "when a trader successfully buys stock market order" do
        it "should send a JSON response with a success message and transaction receipt and updated profile" do
          post "/portfolios/#{@portfolio.id}/transactions/market_order/buy", params: @transaction_params
          
          expect(response).to have_http_status(:ok)
  
          transaction = Transaction.last
          expect(transaction['market_name']).to eq('STOCK')
          expect(transaction['market_order_type']).to eq('MARKET')
          expect(transaction['transaction_type']).to eq('BUY')
          expect(transaction['status']).to eq('FILLED')
          expect(transaction['symbol']).to eq('AAPL')
          expect(transaction['quantity']).to eq(2)
          expect(transaction['price_per_share']).to eq(150.00)
          expect(transaction['amount']).to eq(300.00)
  
          portfolio = Portfolio.find(@portfolio.id)
  
          expect(portfolio['buying_power']).to eq(700.00)
          expect(portfolio['settled_cash']).to eq(700.00)
          expect(portfolio['market_value']).to eq(800.00)
        end
      end
      context "when a trader was unsuccessful in selling stock market order" do
        it "should send a JSON response with a transaction failed message" do
          @transaction_params[:transaction][:quantity] = 0
          post "/portfolios/#{@portfolio.id}/transactions/market_order/buy", params: @transaction_params
  
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end
  
    describe "POST /process_market_order_sell" do
      context "when a trader successfully sells stock market order" do
        it "should send a JSON response with a success message and transaction receipt and updated profile" do
          @transaction_params[:transaction][:transaction_type] = 'SELL'
          post "/portfolios/#{@portfolio.id}/transactions/market_order/sell", params: @transaction_params
          
          expect(response).to have_http_status(:ok)
  
          transaction = Transaction.last
          expect(transaction['market_name']).to eq('STOCK')
          expect(transaction['market_order_type']).to eq('MARKET')
          expect(transaction['transaction_type']).to eq('SELL')
          expect(transaction['status']).to eq('FILLED')
          expect(transaction['symbol']).to eq('AAPL')
          expect(transaction['quantity']).to eq(2)
          expect(transaction['price_per_share']).to eq(150.00)
  
          portfolio = Portfolio.find(@portfolio.id)
  
          expect(portfolio['buying_power']).to eq(1300.00)
          expect(portfolio['settled_cash']).to eq(1300.00)
          expect(portfolio['market_value']).to eq(200.00)
        end
      end
      context "when a trader was unsuccessful in selling stock market order" do
        it "should send a JSON response with a transaction failed message" do
          @transaction_params[:transaction][:price_per_share] = -1500.00
          post "/portfolios/#{@portfolio.id}/transactions/market_order/sell", params: @transaction_params
  
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end
  end

  describe "Stock limit orders" do
    before(:each) do
      @transaction_params = { 
        transaction: {
          market_name: 'STOCK',
          market_order_type: 'LIMIT',
          transaction_type: 'BUY',
          status: 'UNFULFILLED',
          symbol: 'AAPL',
          quantity: 1,
          price_per_share: 500.00
        }
      }
    end
    describe "POST /process_limit_order_buy" do
      context "when a trader successfully processed to buy stock limit order" do
        it "should send a JSON response with a success message and transaction receipt and updated profile" do
          post "/portfolios/#{@portfolio.id}/transactions/limit_order/buy", params: @transaction_params
          
          expect(response).to have_http_status(:ok)
  
          transaction = Transaction.last
          expect(transaction['market_name']).to eq('STOCK')
          expect(transaction['market_order_type']).to eq('LIMIT')
          expect(transaction['transaction_type']).to eq('BUY')
          expect(transaction['status']).to eq('UNFULFILLED')
          expect(transaction['symbol']).to eq('AAPL')
          expect(transaction['quantity']).to eq(1)
          expect(transaction['price_per_share']).to eq(500.00)
  
          portfolio = Portfolio.find(@portfolio.id)
  
          expect(portfolio['buying_power']).to eq(500.00)
          expect(portfolio['settled_cash']).to eq(500.00)
        end
      end
      context "when a trader was unsuccessful to process buy stock limit order" do
        it "should send a JSON response with a transaction failed message" do
          @transaction_params[:transaction][:quantity] = 0
          post "/portfolios/#{@portfolio.id}/transactions/limit_order/buy", params: @transaction_params
  
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end
  
    describe "POST /process_limit_order_sell" do
      context "when a trader successfully processed to sell stock limit order" do
        it "should send a JSON response with a success message and transaction receipt and updated profile" do
          @transaction_params[:transaction][:transaction_type] = 'SELL'
          post "/portfolios/#{@portfolio.id}/transactions/limit_order/sell", params: @transaction_params
          
          expect(response).to have_http_status(:ok)
  
          transaction = Transaction.last
          expect(transaction['market_name']).to eq('STOCK')
          expect(transaction['market_order_type']).to eq('LIMIT')
          expect(transaction['transaction_type']).to eq('SELL')
          expect(transaction['status']).to eq('UNFULFILLED')
          expect(transaction['symbol']).to eq('AAPL')
          expect(transaction['quantity']).to eq(1)
          expect(transaction['price_per_share']).to eq(500.00)
        end
      end
      context "when a trader was unsuccessful to process buy stock limit order" do
        it "should send a JSON response with a transaction failed message" do
          @transaction_params[:transaction][:quantity] = 0
          post "/portfolios/#{@portfolio.id}/transactions/limit_order/sell", params: @transaction_params
  
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end
  end
end