require 'rails_helper'

RSpec.describe User, type: :model do
  describe "associations" do
    it { should have_many(:portfolios).dependent(:destroy) }
  end

  describe "devise configuration" do
    it "includes Devise JWT Revocation Strategies JTIMatcher" do
      expect(User.included_modules).to include(Devise::JWT::RevocationStrategies::JTIMatcher)
    end

    it "is database authenticatable" do
      expect(User.devise_modules).to include(:database_authenticatable)
    end

    it "is registerable" do
      expect(User.devise_modules).to include(:registerable)
    end

    it "is validatable" do
      expect(User.devise_modules).to include(:validatable)
    end

    it "is confirmable" do
      expect(User.devise_modules).to include(:confirmable)
    end

    it "is JWT authenticatable" do
      expect(User.devise_modules).to include(:jwt_authenticatable)
    end
  end

  describe "scope :pending_traders" do
    it "returns pending traders with confirmed_at" do
      pending_user = User.create(
        email: 'pending@example.com',
        password: 'password',
        first_name: 'Pending',
        last_name: 'Trader',
        role: 'TRADER',
        signup_status: 'pending',
        confirmed_at: DateTime.now
      )

      non_pending_user = User.create(
        email: 'non_pending@example.com',
        password: 'password',
        first_name: 'Non',
        last_name: 'Pending',
        role: 'TRADER',
        signup_status: 'approved',
        confirmed_at: DateTime.now
      )

      pending_traders = User.pending_traders

      expect(pending_traders).to include(pending_user)
      expect(pending_traders).not_to include(non_pending_user)
    end
  end
end
