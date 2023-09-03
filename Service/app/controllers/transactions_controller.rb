class TransactionsController < ApplicationController
    before_action :authenticate_user!, :check_if_pending
    
    def process_market_order_buy
        handle_market_order("BUY")
    end

    def process_market_order_sell
        handle_market_order("SELL")
    end

    private

    def handle_market_order(transaction_type)
        portfolio = Portfolio.find(params[:portfolio_id])
        transaction = portfolio.transactions.new(transaction_params)

        if transaction.save
            symbol = transaction_params[:symbol]
            quantity = transaction_params[:quantity].to_f
            price_per_share = transaction_params[:price_per_share].to_f

            if transaction_type == 'BUY'
                portfolio.buy_unit(symbol, quantity, price_per_share)
            else
                portfolio.sell_unit(symbol, quantity, price_per_share)
            end
            render json: {
                status: { code: 200, message: 'Transaction processed'},
                data: { 
                    transaction_receipt: TransactionSerializer.new(transaction).serializable_hash[:data][:attributes],
                    portfolio: portfolio
                }
            }, status: :ok
        else
            render json: {
                status: { code: 422, message: 'Transaction failed'}
            }, status: :unprocessable_entity
        end
    end

    def check_if_pending
        if current_user.signup_status == 'PENDING'
            render json: {
                status: { code: 403, essage: 'Transaction feature is locked. You will receive an email once approved.' }
            }, status: :forbidden
        end
    end

    def transaction_params
        params.require(:transaction).permit(:market_name, :symbol, :price_per_share, :amount, :market_order_type, :status, :quantity, :transaction_type)
    end
end
