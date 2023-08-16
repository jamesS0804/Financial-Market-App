require 'rails_helper'

RSpec.describe "RegistrationsControllers", type: :request do
  describe 'POST #create' do
    context 'when user creation is successful' do
      it 'returns a JSON response with a success message' do
        post "/signup", params: { user: { email: 'user@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "trader" } }
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)).to include(
          'status' => { 'code' => 200, 'message' => 'Signed up successfully.' }
        )
      end
    end

    context 'when user creation fails' do
      it 'returns a JSON response with an error message' do
        post "/signup", params: { user: { email: '', password: 'password', first_name: 'john', last_name: 'doe' } }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)).to include(
          'status' => { 'code' => 422, 'message' => "User couldn't be created successfully. Email can't be blank" }
        )
      end
    end
  end
end
