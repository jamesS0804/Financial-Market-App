class TransactionSerializer
  include JSONAPI::Serializer
  attributes :id, :trader, :market_name, :market_order_type, :transaction_type, :status, :quantity, :price_per_share, :created_at, :updated_at, :amount

  attributes :trader do |object|
    object.portfolio.user.email
  end
end
