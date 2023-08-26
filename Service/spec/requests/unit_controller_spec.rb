require 'rails_helper'

RSpec.describe "Units", type: :request do
  describe "GET /get_data" do
    it "should receive a JSON object from Twelve Data API" do
      get "/get_data"

      expect(response).to have_http_status(:ok)
    end
  end
end
