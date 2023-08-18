require 'rails_helper'

RSpec.describe "Admins", type: :request do
  describe "POST /create_trader" do
    context "when an admin successfully creates a new trader" do
      it "returns a JSON response with a success message and created trader's information" do
        post "/admin/create_trader", params: { user: { id: 1, email: 'user1@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "trader" } }

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

  let(:user) { User.create(email: 'user@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "trader" ) }

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

        puts json_response

        expect(json_response['data']['email']).to eq("user@example.com")
        expect(json_response['data']['first_name']).to eq("test")
        expect(json_response['data']['last_name']).to eq("test")
        expect(json_response['data']['created_at']).to_not be_nil
        expect(json_response['data']['confirmed_at']).to eq(nil)
        expect(json_response['data']['signup_status']).to eq("pending")
      end
    end
  end
end
