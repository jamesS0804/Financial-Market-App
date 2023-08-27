class TransactionsController < ApplicationController
    def process_market_order_buy
        portfolio = Portfolio.find(params[:portfolio_id])
        transaction = portfolio.transactions.new(transaction_params)

        if transaction.save
            price = BigDecimal(transaction_params[:price])
            portfolio.update(
                market_value: portfolio.market_value + price, 
                settled_cash: portfolio.settled_cash - price,
                buying_power: portfolio.buying_power - price
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

    def process_market_order_sell
        portfolio = Portfolio.find(params[:portfolio_id])
        transaction = portfolio.transactions.new(transaction_params)

        if transaction.save
            price = BigDecimal(transaction_params[:price])
            portfolio.update(
                market_value: portfolio.market_value - price, 
                settled_cash: portfolio.settled_cash + price,
                buying_power: portfolio.buying_power + price
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

    private

    def transaction_params
        params.require(:transaction).permit(:market_name, :symbol, :price, :market_order_type, :status, :quantity, :transaction_type)
    end
end
