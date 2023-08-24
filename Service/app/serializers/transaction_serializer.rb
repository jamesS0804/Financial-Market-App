class TransactionSerializer
  include JSONAPI::Serializer
  attributes :id, :trader, :market_name, :market_order_type, :transaction_type, :status, :quantity, :price, :created_at, :updated_at

  attributes :trader do |object|
    object.portfolio.user.email
  end
end
