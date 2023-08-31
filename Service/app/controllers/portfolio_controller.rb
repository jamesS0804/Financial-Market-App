class PortfolioController < ApplicationController
    before_action :authenticate_user!

    def get_portfolio
        user = User.find(params[:user_id])
        portfolio = user.portfolios.first

        render json: {
            status: { code: 200, message: 'Portfolio obtained' },
            data: portfolio
        }, status: :ok
    end
    def get_all_transactions
        user = User.find(params[:user_id])
        portfolio = user.portfolios.first
        transactions = portfolio.transactions.all

        render json: {
            status: { code: 200, message: 'Transactions obtained' },
            data: transactions
        }, status: :ok
    end
end
