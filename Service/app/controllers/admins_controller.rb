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
        user = User.find(params[:user_id])

        if user
            render json: {
                status: { code: 200, message: "Trader found."},
                data: UserExtendedSerializer.new(user).serializable_hash[:data][:attributes]
            }, status: :ok
        else
            render json: {
                status: { code: 422, message: "Trader does not exist." }
            }, status: :unprocessable_entity
        end
    end

    def delete_trader
        user = User.find(params[:user_id])

        if user.destroy
            render json: {
                status: { code: 200, message: "Trader deletion successful."}
            }, status: :ok
        else
            render json: {
                status: { code: 422, message: "Trader deletion failed." }
            }, status: :unprocessable_entity
        end
    end

    def view_all_traders
        trader_users = User.where(role: :trader).map do |user|
            UserExtendedSerializer.new(user).serializable_hash[:data][:attributes]
        end

        render json: {
                status: { code: 200, message: "All traders' information obtained."},
                data: trader_users
        }, status: :ok
    end

    def view_all_pending
        pending_traders = User.where(signup_status: "pending").map do |user|
            UserExtendedSerializer.new(user).serializable_hash[:data][:attributes]
        end

        render json: {
                status: { code: 200, message: "All pending traders obtained"},
                data: pending_traders
        }, status: :ok
    end

    def approve_trader
        user_to_approve = User.find(params[:user_id])

        if user_to_approve.update(signup_status: "approved")
            render json: {
                status: { code: 200, message: "Trader approved."},
                data: UserExtendedSerializer.new(user_to_approve).serializable_hash[:data][:attributes]
        }, status: :ok
        end
    end

    def view_all_transactions

    end

    private

    def trader_params
        params.require(:user).permit(:email, :password, :first_name, :last_name, :role)
    end
end
