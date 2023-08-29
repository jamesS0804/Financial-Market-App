class PortfolioController < ApplicationController
    before_action :authenticate_user!

    def get_portfolio
        user = User.find(params[:id])
        portfolio = user.portfolios.first

        render json: {
            status: { code: 200, message: 'Portfolio obtained' },
            data: portfolio
        }, status: :ok
    end
end
