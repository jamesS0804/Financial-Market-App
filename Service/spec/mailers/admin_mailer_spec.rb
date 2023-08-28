require "rails_helper"

RSpec.describe AdminMailer, type: :mailer do
  describe "Confirmation email" do
    let(:user) { User.create(email: 'user@example.com', password: 'password', first_name: 'john', last_name: 'doe', role: 'TRADER', confirmed_at: Date.today) }
  
    before do
      ActionMailer::Base.deliveries.clear
    end
  
    it "sends an email to the user with the confirmation link" do
      AdminMailer.confirmation_email(user).deliver_now
  
      expect(ActionMailer::Base.deliveries.size).to eq(1)
  
      email = ActionMailer::Base.deliveries.first
      expect(email.to).to eq([user.email])
      expect(email.subject).to eq("Trader Account Confirmed")
    end
  end
end
