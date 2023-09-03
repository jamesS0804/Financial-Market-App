class TransactionsController < ApplicationController
    include JsonRender
    before_action :authenticate_user!, :check_if_pending
    
    def process_market_order_buy
        handle_market_order(:BUY)
    end

    def process_market_order_sell
        handle_market_order(:SELL)
    end

    private

    def handle_market_order(transaction_type)
        portfolio = Portfolio.find(params[:portfolio_id])

        quantity = transaction_params[:quantity].to_f
        price_per_share = transaction_params[:price_per_share].to_f

        if portfolio.has_enough_balance?(price_per_share, quantity)
            transaction = portfolio.transactions.new(transaction_params)
            symbol = transaction_params[:symbol]

            if transaction.save
                transaction_type.to_sym == :BUY ? portfolio.buy_unit(symbol, quantity, price_per_share) : portfolio.sell_unit(symbol, quantity, price_per_share)
                
                render_json_response(
                    data: { 
                        transaction_receipt: TransactionSerializer.new(transaction).serializable_hash[:data][:attributes],
                        portfolio: portfolio
                    }, 
                    message: 'Transaction processed')
            else
                render_json_response(status_code: 422 , message: "Transaction failed")
            end
        else
            render_json_response(status_code: 422 , message: "Transaction failed. You don't have enough balance")
        end
    end

    def check_if_pending
        if current_user.signup_status == 'PENDING'
            render_json_response(status_code: 403 , message: 'Transaction feature is locked. You will receive an email once approved.')
        end
    end

    def render_json_response(status_code: nil, message: , data: nil)
        render_json(status_code, message , data)
    end

    def transaction_params
        params.require(:transaction).permit(:market_name, :symbol, :price_per_share, :amount, :market_order_type, :status, :quantity, :transaction_type)
    end
end