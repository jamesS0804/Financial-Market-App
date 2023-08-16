class AdminsController < ApplicationController
    respond_to :json

    def create_trader
        user = User.new(trader_params)

        if user.save
            render json: {
                status: { code: 200, message: "Trader creation successful."},
                data: {
                    id: user.id, 
                    email: user.email, 
                    password: user.password, 
                    first_name: user.first_name, 
                    last_name: user.last_name, 
                    role: user.role 
                }
            }, status: :ok
        else
            render json: {
                status: { code: 422, message: "Trader creation failed." }
            }, status: :unprocessable_entity
        end
    end

    def edit_trader

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
