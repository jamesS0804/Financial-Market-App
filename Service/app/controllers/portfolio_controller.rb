class PortfolioController < ApplicationController
    include JsonRender 
    before_action :authenticate_user!
    before_action :find_user_and_portfolio

    def get_portfolio
        render_json_response(data: @default_portfolio, message: "Portfolio obtained")
    end
    
    def get_all_transactions
        transactions = @default_portfolio.transactions.all
        render_json_response(data: transactions, message: "Transactions obtained")
    end

    def get_all_portfolio_units
        portfolio_units = @default_portfolio.portfolio_units
        render_json_response(data: portfolio_units, message: "Portfolio units obtained")
    end

    private

    def find_user_and_portfolio
        user = User.find(params[:user_id])
        @default_portfolio = user.get_default_portfolio
        rescue ActiveRecord::RecordNotFound
            render_json_response(status_code: 404, message: 'User not found')
    end

    def render_json_response(status_code: nil, message: , data: nil)
        render_json(status_code, message , data)
    end
end