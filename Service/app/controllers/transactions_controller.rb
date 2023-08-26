class TransactionsController < ApplicationController
    def process_market_order_buy
        portfolio = Portfolio.find(params[:portfolio_id])
        puts portfolio.inspect
        transaction = portfolio.transactions.new(transaction_params)

        puts transaction.errors.inspect

        if transaction.save
            puts transaction.inspect
            render json: {
                status: { code: 200, message: 'Transaction processed'},
                data: TransactionSerializer.new(transaction).serializable_hash[:data][:attributes]
            }, status: :ok
        else
            puts transaction.inspect
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
