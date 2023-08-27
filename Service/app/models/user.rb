class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :portfolios, dependent: :destroy
  
  enum role: [ :TRADER, :ADMIN ]
  scope :pending_traders, -> { where(signup_status: 'pending').where.not(confirmed_at: nil) }

  validates :email, presence: true, uniqueness: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :role, presence: true

  private

  def self.serialize_pending_traders
    pending_traders.map do |user|
      UserExtendedSerializer.new(user).serializable_hash[:data][:attributes]
    end
  end
end
