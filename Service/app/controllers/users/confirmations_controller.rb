# frozen_string_literal: true

class Users::ConfirmationsController < Devise::ConfirmationsController
  def show
    super do |resource|
      if resource.errors.empty?
        redirect_to 'http://localhost:5173' and return
      end
    end
  end
end
