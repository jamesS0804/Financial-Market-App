class AdminsController < ApplicationController
    respond_to :json

    def create_trader
        user = User.new(trader_params)

        if user.save
            render json: {
                status: { code: 200, message: "Trader creation successful."},
                data: UserExtendedSerializer.new(user).serializable_hash[:data][:attributes]
            }, status: :ok
        else
            render json: {
                status: { code: 422, message: "Trader creation failed." }
            }, status: :unprocessable_entity
        end
    end

    def edit_trader
        user = User.find(params[:user_id])

        if user.update(trader_params)
            user.email = trader_params[:email]
            render json: {
                status: { code: 200, message: "Trader update successful."},
                data: UserExtendedSerializer.new(user).serializable_hash[:data][:attributes]
            }, status: :ok
        else
            render json: {
                status: { code: 422, message: "Trader creation failed." }
            }, status: :unprocessable_entity
        end
    end

    def view_trader

    end

    def delete_trader

    end

    def view_all_traders

    end

    def view_all_pending

    end

    def approve_trader

    end

    def view_all_transactions

    end

    private

    def trader_params
        params.require(:user).permit(:email, :password, :first_name, :last_name, :role)
    end
end
