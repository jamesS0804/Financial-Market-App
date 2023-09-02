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

  after_save :create_default_portfolio

  def get_default_portfolio
    portfolio = self.portfolios.first
  end

  def create_default_portfolio
      self.portfolios.create(
        name: "Default Portfolio",
        buying_power: 10000,
        settled_cash: 10000,
        market_value: 0,
      )   
  end
end
