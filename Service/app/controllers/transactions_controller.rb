class TransactionsController < ApplicationController
    before_action :authenticate_user!
    before_action :check_if_pending!
    
    def process_market_order_buy
        portfolio = Portfolio.find(params[:portfolio_id])
        transaction = portfolio.transactions.new(transaction_params)

        if transaction.save
            symbol = transaction_params[:symbol]
            quantity = transaction_params[:quantity].to_f
            price_per_share = transaction_params[:price_per_share].to_f

            portfolio.buy_unit(symbol, quantity, price_per_share)
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

    def process_market_order_sell
        portfolio = Portfolio.find(params[:portfolio_id])
        transaction = portfolio.transactions.new(transaction_params)

        if transaction.save
            symbol = transaction_params[:symbol]
            quantity = transaction_params[:quantity].to_f
            price_per_share = transaction_params[:price_per_share].to_f
            
            portfolio.sell_unit(symbol, quantity, price_per_share)
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

    def process_limit_order_buy
        portfolio = Portfolio.find(params[:portfolio_id])
        transaction = portfolio.transactions.new(transaction_params)

        if transaction.save
            portfolio.update( 
                settled_cash: portfolio.settled_cash - transaction.amount,
                buying_power: portfolio.buying_power - transaction.amount
            )
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

    def process_limit_order_sell
        portfolio = Portfolio.find(params[:portfolio_id])
        transaction = portfolio.transactions.new(transaction_params)

        if transaction.save
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

    private

    def check_if_pending
        unless current_user.signup_status('APPROVED')
            render json: {
                status: {
                    status: { 
                        code: 403, 
                        message: 'Transaction feature is locked. You will receive an email once approved.' }
                }, status: :forbidden
            }
        end
    end

    def transaction_params
        params.require(:transaction).permit(:market_name, :symbol, :price_per_share, :amount, :market_order_type, :status, :quantity, :transaction_type)
    end
end
