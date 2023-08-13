class User < ApplicationRecord
  has_many :portfolios, dependent: :destroy
  enum role: [ :trader, :admin ]

  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable,
         :jwt_authenticatable, jwt_revocation_strategy: self
end
