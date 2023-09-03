# frozen_string_literal: true

class Users::ConfirmationsController < Devise::ConfirmationsController
  def show
    super do |resource|
      if resource.errors.empty?
        sign_in(resource)
        redirect_to 'http://localhost:5173'
      end
    end
  end
end
