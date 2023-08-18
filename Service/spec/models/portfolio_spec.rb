require 'rails_helper'

RSpec.describe Portfolio, type: :model do
  describe "associations" do
    it { should have_many(:transactions).dependent(:destroy) }
    it { should belong_to(:user) }
  end

  describe "validations" do
    portfolio_params = { name: "Test Portfolio" }

    it "should not be valid without name" do
      portfolio = Portfolio.create(portfolio_params)
      portfolio[:name] = nil
      expect(portfolio).to_not be_valid
    end
    it "should not be valid if it's not unique" do
      original_portfolio = Portfolio.create(portfolio_params)
      duplicate_portfolio = Portfolio.create(portfolio_params)
      expect(duplicate_portfolio).to_not be_valid
    end
  end
end
