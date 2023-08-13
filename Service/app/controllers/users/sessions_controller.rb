class Users::SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(resource, _opts={})
    expiry_object = Time.parse("#{Time.now + 30.minutes.to_i}")
    expiry_in_seconds = expiry_object.to_i

    response.headers['expiry'] = expiry_in_seconds
    render json: {
      status: {
        code: 200,
        message: 'Logged in successfully'
      },
      data: {
        user: UserSerializer.new(resource).serializable_hash[:data][:attributes]
      }
    }, status: :ok
  end

  def respond_to_on_destroy
    begin
      jwt_payload = JWT.decode(request.headers['Authorization'].split(' ')[1], ENV['DEVISE_JWT_SECRET_KEY'], true, algorithm: 'HS256', verify_jti: true)
      user_id = jwt_payload[0]['sub']
      current_user = User.find(user_id)

      if current_user
        sign_out(current_user)

        render json: {
          status: 200,
          message: "logged out successfully"
        }, status: :ok
      end
    rescue JWT::DecodeError
      render json: {
        status: 401,
        message: "Invalid authentication token."
      }, status: :unauthorized
    end
  end

  def sessions_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :first_name, :last_name, :role)
  end
end