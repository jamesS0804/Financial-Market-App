class UserExtendedSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :password, :first_name, :last_name, :role, :created_at, :confirmed_at, :signup_status
end
