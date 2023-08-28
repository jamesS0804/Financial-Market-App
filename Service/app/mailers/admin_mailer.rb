class AdminMailer < ApplicationMailer
    def confirmation_email(user)
        @user = user
        mail(to: @user.email, subject: 'Trader Account Confirmed')
    end
end
