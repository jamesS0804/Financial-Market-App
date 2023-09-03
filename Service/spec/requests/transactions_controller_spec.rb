require 'rails_helper'

RSpec.describe "TransactionsController", type: :request do
  describe "User's signup_status is APPROVED" do
    let(:user) { User.create(email: 'user1@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "TRADER", signup_status: 'APPROVED', confirmed_at: Date.today) }

    before(:each) do
      sign_in(user)
      market = Market.create(name: 'STOCK')
      unit = Unit.create(
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
    end
    describe "Stock Market orders" do
      before(:each) do
        @portfolio = user.portfolios.first
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
        @existing_unit = @portfolio.portfolio_units.create(
          symbol: 'AAPL',
          company_name: 'Apple Inc.',
          price_per_share: 150,
          quantity: 2,
          amount: 500
        )
      end
      describe "POST /process_market_order_buy" do
        context "trader has enough balance in his portfolio to make a transaction" do
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
      
              expect(portfolio['buying_power']).to eq(9700)
              expect(portfolio['settled_cash']).to eq(9700)
              expect(portfolio['market_value']).to eq(300)
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
              @portfolio.update(market_value: 500)
  
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
  
              expect(portfolio['buying_power']).to eq(10300)
              expect(portfolio['settled_cash']).to eq(10300)
              expect(portfolio['market_value']).to eq(200)
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
        
      context "when a trader DOESN'T have enough balance in his portfolio to make a transaction" do
        it "should send a JSON response with a transaction failed message informing of insufficient balance" do
          @transaction_params[:transaction][:quantity] = 100
          @transaction_params[:transaction][:price_per_share] = 150
          post "/portfolios/#{@portfolio.id}/transactions/market_order/buy", params: @transaction_params

          expect(response).to have_http_status(:unprocessable_entity)
          
          json_response = JSON.parse(response.body)

          expect(json_response['status']['message']).to eq("Transaction failed. You don't have enough balance")
        end
      end
    end
  end
  
  describe "User's signup_status is PENDING" do
    let(:pending_user) { User.create(email: 'user1@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "TRADER", signup_status: 'PENDING', confirmed_at: Date.today) }
  
    context "when a pending user tries to do a transaction" do
      it "should send a JSON response with a forbidden status and error message" do
        sign_in(pending_user)
        portfolio = pending_user.portfolios.first
        post "/portfolios/#{portfolio.id}/transactions/market_order/buy", params: @transaction_params

        expect(response).to have_http_status(:forbidden)
      end
    end
  end
end