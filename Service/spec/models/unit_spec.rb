require 'rails_helper'

RSpec.describe Unit, type: :model do
  describe "associations" do
    it { should belong_to(:market) }
  end
end
