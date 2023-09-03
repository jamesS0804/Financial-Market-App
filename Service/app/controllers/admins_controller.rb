class AdminsController < ApplicationController
    include JsonRender
    respond_to :json
    before_action :authenticate_user!
    before_action :authenticate_admin
    before_action :find_user, only: [:edit_trader, :view_trader, :delete_trader, :approve_trader]

    def create_trader
        user = User.new(trader_params)
        if user.save
            data = UserExtendedSerializer.new(user).serializable_hash[:data][:attributes]
            message = 'Trader creation successful.'
        else
            status_code = 422
            message = user.errors.full_messages
        end
        render_json_response(status_code: status_code, data: data, message: message)
    end

    def edit_trader
        if @user.update(trader_params)
            data = UserExtendedSerializer.new(@user).serializable_hash[:data][:attributes]
            message = 'Trader update successful.'
        else
            status_code = 422
            message = @user.errors.full_messages
        end
        render_json_response(status_code: status_code, data: data, message: message)
    end

    def view_trader
        render_json_response(data: UserExtendedSerializer.new(@user).serializable_hash[:data][:attributes], message: 'Trader found.')
    end

    def delete_trader
        if @user.destroy
            message = 'Trader deletion successful.'
        else
            status_code = 422
            message = 'Trader deletion failed.'
        end
        render_json_response(status_code: status_code, message: message)
    end

    def view_all_traders
        trader_users = User.all.map do |user|
            UserExtendedSerializer.new(user).serializable_hash[:data][:attributes]
        end
        render_json_response(data: trader_users, message: "All traders' information obtained")
    end

    def view_all_pending
        pending_traders = User.pending_traders.map do |user|
            UserExtendedSerializer.new(user).serializable_hash[:data][:attributes]
        end
        render_json_response(data: pending_traders, message: 'All pending traders obtained')
    end

    def approve_trader
        if @user.update(signup_status: "approved")
            AdminMailer.confirmation_email(@user).deliver_now
            render_json_response(data: @user, message: 'Trader approved and confirmation email sent')
        end
    end

    def view_all_transactions
        all_transactions = Transaction.all
        serialized_transactions = all_transactions.map do |transaction|
            TransactionSerializer.new(transaction).serializable_hash[:data][:attributes]
        end
        render_json_response(data: serialized_transactions, message: 'All transactions obtained')
    end

    private

    def find_user
        @user = User.find(params[:user_id])
    rescue ActiveRecord::RecordNotFound
        render_json_response(status_code: 404, message: 'User not found')
    end

    def authenticate_admin
        unless current_user && current_user.ADMIN?
            render_json_response(status_code: 403, message: "You don't have permission to access this page.")
        end
    end

    def render_json_response(status_code: nil, message: , data: nil)
        render_json(status_code, message , data)
    end

    def trader_params
        params.require(:user).permit(:email, :password, :first_name, :last_name, :role, :signup_status, :confirmed_at)
    end
end