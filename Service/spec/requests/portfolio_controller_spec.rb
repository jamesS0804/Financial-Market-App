require 'rails_helper'

RSpec.describe "Portfolios", type: :request do
  let(:user) { User.create(email: 'user1@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "TRADER", confirmed_at: Date.today) }
  before(:each) do
    sign_in(user)
    @portfolio = user.portfolios.create(name: 'test portfolio', settled_cash: 1000.00, buying_power: 1000.00, market_value: 500.00)
  end

  describe "GET /get_portfolio" do
    it "should return a JSON response with a success message and portfolio data" do
      get "/trader/#{user.id}/portfolio"

      expect(response).to have_http_status(:ok)

      json_response = JSON.parse(response.body)

      expect(json_response['status']['message']).to eq("Portfolio obtained")
    end
  end
  describe "GET /get_all_transactions" do
    it "should return a JSON response with a success message and the portfolio's transaction data" do
      get "/trader/#{user.id}/portfolio/transactions"

      expect(response).to have_http_status(:ok)

      json_response = JSON.parse(response.body)

      expect(json_response['status']['message']).to eq("Transactions obtained")
    end
  end
  describe "get_all_portfolio_units" do
    context "when a trader wants to get his default portfolio" do
      it "should get the default created portfolio" do
        user = User.create({ email: 'user@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "TRADER", confirmed_at: '2023-08-27T00:00:00.000Z' })
        get "/trader/#{user.id}/portfolio/all_portfolio_units"

        default_portfolio = user.get_default_portfolio
        
        expect(default_portfolio).not_to eq(nil)
        expect(response).to have_http_status(:ok)

        json_response = JSON.parse(response.body)
        expect(json_response['status']['message']).to eq('Portfolio units obtained')
      end
    end
  end
  describe "find user and portfolio" do
    context "when a trader wants to use any methods and the user is not found" do
      it "should get the default created portfolio" do
        # user = User.create({ email: 'user@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "TRADER", confirmed_at: '2023-08-27T00:00:00.000Z' })
        get "/trader/#{0}/portfolio/all_portfolio_units"

        expect(response).to have_http_status(404)

        json_response = JSON.parse(response.body)
        expect(json_response['status']['message']).to eq('User not found')
      end
    end
  end
end
