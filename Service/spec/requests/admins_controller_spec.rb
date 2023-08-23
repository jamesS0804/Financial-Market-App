require 'rails_helper'

RSpec.describe "Admins", type: :request do
  describe "POST /create_trader" do
    context "when an admin successfully creates a new trader" do
      it "returns a JSON response with a success message and created trader's information" do
        post "/admin/create_trader", params: { user: { id: 1, email: 'user1@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "TRADER" } }

        expect(response).to have_http_status(:ok)

        json_response = JSON.parse(response.body)

        expect(json_response['data']['email']).to eq("user1@example.com")
        expect(json_response['data']['password']).to eq("password")
        expect(json_response['data']['first_name']).to eq("test")
        expect(json_response['data']['last_name']).to eq("test")
        expect(json_response['data']['created_at']).to_not be_nil
        expect(json_response['data']['confirmed_at']).to eq(nil)
        expect(json_response['data']['signup_status']).to eq("pending")
      end
    end
  end

  let(:user) { User.create(email: 'user@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "TRADER" ) }

  describe "PATCH /edit_trader" do
    context "when an admin successfully edited a trader's info" do
      it "returns a JSON response with a success message and updated trader's information" do
        patch "/admin/edit_trader/#{user.id}", params: { 
          user: { 
            email: 'updated_email@example.com', password: 'updated_password', 
            first_name: 'updated_first_name', last_name: 'updated_last_name'
          } 
        }

        expect(response).to have_http_status(:ok)

        json_response = JSON.parse(response.body)

        expect(json_response['data']['email']).to eq("updated_email@example.com")
        expect(json_response['data']['password']).to eq("updated_password")
        expect(json_response['data']['first_name']).to eq("updated_first_name")
        expect(json_response['data']['last_name']).to eq("updated_last_name")
      end
    end
  end

  describe "GET /view_trader" do
    context "when an admin wants to view a trader's info" do
      it "returns a JSON response with a success message and trader's information" do
        get "/admin/view_trader/#{user.id}"

        expect(response).to have_http_status(:ok)

        json_response = JSON.parse(response.body)

        expect(json_response['data']['email']).to eq("user@example.com")
        expect(json_response['data']['first_name']).to eq("test")
        expect(json_response['data']['last_name']).to eq("test")
        expect(json_response['data']['created_at']).to_not be_nil
        expect(json_response['data']['confirmed_at']).to eq(nil)
        expect(json_response['data']['signup_status']).to eq("pending")
      end
    end
  end

  describe "DELETE /delete_trader" do
    context "when an admin wants to delete a trader" do
      it "returns a JSON response with a success message" do
        delete "/admin/delete_trader/#{user.id}"

        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe "GET /view_all_traders" do
    context "when an admin wants to see all traders' information" do
      it "returns a JSON response with a success message" do
        user1 = User.create(email: 'user1@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "TRADER" )
        user2 = User.create(email: 'user2@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "TRADER" )

        get "/admin/view_all_traders"

        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe "GET /view_all_pending" do
    context "when an admin wants to see all pending traders' information" do
      it "returns a JSON response with a success message" do
        user1 = User.create(email: 'user1@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "TRADER")
        user2 = User.create(email: 'user2@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "TRADER")

        get "/admin/view_all_pending"

        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe "PATCH /approve_trader" do
    context "when an admin wants to approve a specific trader" do
      it "returns a JSON response with a success message" do
        user = User.create(email: 'user1@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "TRADER")

        patch "/admin/approve_trader/#{user.id}"

        expect(response).to have_http_status(:ok)

        json_response = JSON.parse(response.body)

        expect(json_response['data']['signup_status']).to eq('approved')
      end
    end
  end

  describe "GET /view_all_transactions" do
    context "when an admin wants to see all transactions" do
      it "returns a JSON response with a success message" do
        user = User.create(email: 'user1@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "TRADER")
        portfolio1 = user.portfolios.create(name: 'sample portfolio')
        transaction1 = portfolio1.transactions.create(
          market_name: 'STOCK',
          market_order_type: 'MARKET ORDER',
          transaction_type: 'BUY',
          status: 'FILLED',
          symbol: 'AAPL',
          quantity: 10,
          price: 150.00,
        )
        transaction2 = portfolio1.transactions.create(
          market_name: 'STOCK',
          market_order_type: 'MARKET ORDER',
          transaction_type: 'BUY',
          status: 'FILLED',
          symbol: 'GOOGL',
          quantity: 5,
          price: 2500.00,
        )
        transaction3 = portfolio1.transactions.create(
          market_name: 'STOCK',
          market_order_type: 'MARKET ORDER',
          transaction_type: 'SELL',
          status: 'FILLED',
          symbol: 'AAPL',
          quantity: 3,
          price: 155.00,
        )

        get "/admin/view_all_transactions"

        expect(response).to have_http_status(:ok)
      end
    end
  end
end
