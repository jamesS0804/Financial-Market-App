# frozen_string_literal: true

class Users::ConfirmationsController < Devise::ConfirmationsController
  def show
    super do |resource|
      if resource.errors.empty?
        redirect_to 'https://financial-market-app-fe.onrender.com/' and return
      end
    end
  end
end
