require 'rails_helper'

RSpec.describe "Admins", type: :request do
  describe "POST /create_trader" do
    context "when an admin successfully creates a new trader" do
      it "returns a JSON response with a success message and created trader's information" do
        post "/admin/create_trader", params: { user: { id: 1, email: 'user@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "trader" } }

        expect(response).to have_http_status(:ok)

        json_response = JSON.parse(response.body)

        expect(json_response['data']['email']).to eq("user@example.com")
        expect(json_response['data']['password']).to eq("password")
        expect(json_response['data']['first_name']).to eq("test")
        expect(json_response['data']['last_name']).to eq("test")
        expect(json_response['data']['created_at']).to_not be_nil
        expect(json_response['data']['confirmed_at']).to eq(nil)
        expect(json_response['data']['signup_status']).to eq("pending")
      end
    end
  end
end
