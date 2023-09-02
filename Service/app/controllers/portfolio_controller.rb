class PortfolioController < ApplicationController
    before_action :authenticate_user!
    before_action :find_user_and_portfolio

    def get_portfolio
        render_success_response(data: @default_portfolio, message: "Portfolio obtained")
    end
    
    def get_all_transactions
        transactions = @default_portfolio.transactions.all
        render_success_response(data: transactions, message: "Transactions obtained")
    end

    private

    def find_user_and_portfolio
        user = User.find(params[:user_id])
        @default_portfolio = user.get_default_portfolio
        rescue ActiveRecord::RecordNotFound
            render_error_response(message: 'User not found', status: :not_found)
    end

    def render_success_response(data:, message:)
        render json: {
            status: { code: 200, message: message },
            data: data
        }, status: :ok
    end

    def render_error_response(message:, status:)
        render json: {
            status: { code: status, message: message }
        }, status: status
    end
end
