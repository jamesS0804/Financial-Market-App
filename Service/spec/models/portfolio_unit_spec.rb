require 'rails_helper'

RSpec.describe PortfolioUnit, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:symbol) }
    it { should validate_presence_of(:company_name) }
    it { should validate_presence_of(:price_per_share) }

    it 'validates that symbol is case-sensitively unique' do
      user = User.create(email: 'user1@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "TRADER", signup_status: 'APPROVED', confirmed_at: Date.today)
      portfolio = user.portfolios.first
      unit1 = portfolio.portfolio_units.create(
        symbol: 'AAPL',
        company_name: 'Apple Inc.',
        price_per_share: 150,
        quantity: 2,
        amount: 500
      )
      unit2 = portfolio.portfolio_units.create(
        symbol: 'AAPL',
        company_name: 'Apple Inc.',
        price_per_share: 150,
        quantity: 2,
        amount: 500
      )
      expect(unit1).to be_valid
      expect(unit2).not_to be_valid
      expect(unit2.errors[:symbol]).to include('has already been taken')
      expect(unit2.errors[:company_name]).to include('has already been taken')
    end

    it 'validates that quantity is greater than or equal to 0' do
      should validate_numericality_of(:quantity).is_greater_than_or_equal_to(0).with_message('must be greater than 0')
    end

    it 'validates that amount is greater than or equal to 0' do
      should validate_numericality_of(:amount).is_greater_than_or_equal_to(0).with_message('must be greater than 0')
    end
  end

  describe 'associations' do
    it { should belong_to(:portfolio) }
  end
end
