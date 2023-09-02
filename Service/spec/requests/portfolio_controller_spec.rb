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
end
