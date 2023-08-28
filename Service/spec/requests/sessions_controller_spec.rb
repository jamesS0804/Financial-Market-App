require 'rails_helper'

RSpec.describe "SessionsControllers", type: :request do
  let(:user) { User.create(email: 'user@example.com', password: 'password', first_name: 'john', last_name: 'doe', role: 'TRADER', confirmed_at: Date.today) }

  before { post '/login', params: { user: { email: user.email, password: user.password } } }

  describe 'POST sign_in' do
    context 'when the user logged in and is authenticated' do
      it 'returns a JSON response with a success message' do
        expect(response).to have_http_status(:ok)
        
        json_response = JSON.parse(response.body)
        expect(json_response['status']['code']).to eq(200)
        expect(json_response['status']['message']).to eq('Logged in successfully')
        expect(json_response['data']['user']['email']).to eq(user.email)

        json_headers = response.headers
        expect(json_headers['Authorization']).to_not be_empty
        expect(json_headers['expiry']).to_not be_nil
      end
    end
  end

  describe 'DELETE sign_out' do
    context 'when the user logs out successfully' do
      it 'returns a JSON response with a success message' do
        headers = { 'Authorization' =>  response.headers['Authorization']}

        delete '/logout', headers: headers

        expect(response).to have_http_status(:ok)
        json_response = JSON.parse(response.body)
        expect(json_response['status']).to eq(200)
        expect(json_response['message']).to eq('logged out successfully')
      end
    end

    context 'when an unauthorized user logs out' do
      it 'returns a JSON response with an error message when the user is not found' do
        headers = { 'Authorization' =>  ''}

        delete '/logout', headers: headers
  
        expect(response).to have_http_status(:unauthorized)
        json_response = JSON.parse(response.body)
        expect(json_response['status']).to eq(401)
        expect(json_response['message']).to eq("Invalid authentication token.")
      end
    end
  end
end