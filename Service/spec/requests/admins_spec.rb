require 'rails_helper'

RSpec.describe "Admins", type: :request do
  describe "POST /create_trader" do
    context "when an admin successfully creates a new trader" do
      it "returns a JSON response with a success message and created trader's information" do
        post "/admin/create_trader", params: { user: { id: 1, email: 'user@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "trader" } }

        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)).to include(
          "data" => { "id" => 1, "email" => 'user@example.com', "password" => 'password', "first_name" => 'test', "last_name" => 'test', "role" => "trader" }
        )
      end
    end
  end
end
