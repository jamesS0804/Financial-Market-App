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
end
