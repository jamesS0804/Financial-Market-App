require 'rails_helper'

RSpec.describe "Admins", type: :request do
  let(:non_admin_user) { User.create({ email: 'user@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "TRADER", confirmed_at: '2023-08-27T00:00:00.000Z' }) }
  describe "when user is an admin" do
    let(:admin) { User.create(email: 'admin@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "ADMIN", confirmed_at: Date.today) }
    
    
    before(:each) do
      sign_in(admin)
    end

    describe "POST /create_trader" do
      context "when an admin successfully creates a new trader" do
        it "returns a JSON response with a success message and created trader's information" do
          post "/admin/create_trader", params: { user: { email: 'valid_user@example.com', password: 'password', first_name: 'FirstValid', last_name: 'LastValid', role: "TRADER" } }

          expect(response).to have_http_status(:ok)

          json_response = JSON.parse(response.body)

          expect(json_response['data']['email']).to eq("valid_user@example.com")
          expect(json_response['data']['password']).to eq("password")
          expect(json_response['data']['first_name']).to eq("FirstValid")
          expect(json_response['data']['last_name']).to eq("LastValid")
          expect(json_response['data']['created_at']).to_not be_nil
          expect(json_response['data']['confirmed_at']).to eq(nil)
          expect(json_response['data']['signup_status']).to eq("pending")
        end
      end
      context "when an admin is unsuccessful in creating a new trader" do
        it "should return a JSON response with an error message" do
          post "/admin/create_trader", params: { user: { email: non_admin_user.email, password: 'password', first_name: 'test', last_name: 'test', role: "TRADER" } }

          expect(response).to have_http_status(:unprocessable_entity)
          json_response = JSON.parse(response.body)
          expect(json_response['status']['message']).to eq('Email has already been taken')
        end
      end
    end

    describe "PATCH /edit_trader" do
      context "when an admin successfully edited a trader's info" do
        it "returns a JSON response with a success message and updated trader's information" do
          patch "/admin/edit_trader/#{non_admin_user.id}", params: { 
            user: { 
              email: 'updated_email@example.com', password: 'updated_password', 
              first_name: 'updated_first_name', last_name: 'updated_last_name'
            } 
          }

          expect(response).to have_http_status(:ok)

          json_response = JSON.parse(response.body)

          expect(json_response['data']['email']).to eq("updated_email@example.com")
          expect(json_response['data']['password']).to eq("updated_password")
          expect(json_response['data']['first_name']).to eq("updated_first_name")
          expect(json_response['data']['last_name']).to eq("updated_last_name")
        end
      end
      describe "when an admin fails to edit a trader'info" do
        context "whan trader's email is blank" do
          it "returns a JSON response with an error message" do
            patch "/admin/edit_trader/#{non_admin_user.id}", params: { 
              user: { 
                email: '', password: 'password', first_name: 'test', last_name: 'test', role: 'TRADER' 
              } 
            }
            expect(response).to have_http_status(:unprocessable_entity)
    
            json_response = JSON.parse(response.body)
    
            expect(json_response['status']['message']).to eq("Email can't be blank")
          end
        end
        context "when trader's email already exists" do
          it "returns a JSON response with an error message" do
            dupe_user = User.create(email: 'dupe_email@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "TRADER")
            patch "/admin/edit_trader/#{non_admin_user.id}", params: { 
              user: { 
                email: 'dupe_email@example.com', password: 'password', first_name: 'test', last_name: 'test', role: 'TRADER' 
              } 
            }
            expect(response).to have_http_status(:unprocessable_entity)
    
            json_response = JSON.parse(response.body)
    
            expect(json_response['status']['message']).to eq("Email has already been taken")
          end
        end
        context "when trader's first name is blank" do
          it "returns a JSON response with an error message" do
            patch "/admin/edit_trader/#{non_admin_user.id}", params: { 
              user: { 
                email: 'user@example.com', password: 'password', first_name: '', last_name: 'test', role: 'TRADER' 
              } 
            }
            expect(response).to have_http_status(:unprocessable_entity)
    
            json_response = JSON.parse(response.body)
    
            expect(json_response['status']['message']).to eq("First name can't be blank")
          end
        end
        context "when trader's last name is blank" do
          it "returns a JSON response with an error message" do
            patch "/admin/edit_trader/#{non_admin_user.id}", params: { 
              user: { 
                email: 'user@example.com', password: 'password', first_name: 'test', last_name: '', role: 'TRADER' 
              } 
            }
            expect(response).to have_http_status(:unprocessable_entity)
    
            json_response = JSON.parse(response.body)
    
            expect(json_response['status']['message']).to eq("Last name can't be blank")
          end
        end
        context "when trader's role name is blank" do
          it "returns a JSON response with an error message" do
            patch "/admin/edit_trader/#{non_admin_user.id}", params: { 
              user: { 
                email: 'user@example.com', password: 'password', first_name: 'test', last_name: 'test', role: '' 
              } 
            }
            expect(response).to have_http_status(:unprocessable_entity)
    
            json_response = JSON.parse(response.body)
    
            expect(json_response['status']['message']).to eq("Role can't be blank")
          end
        end
        context "when there are many blank inputs for trader's info" do
          it "returns a JSON response with an error message" do
            patch "/admin/edit_trader/#{non_admin_user.id}", params: { 
              user: { 
                email: '', password: 'password', first_name: '', last_name: '', role: '' 
              } 
            }
            expect(response).to have_http_status(:unprocessable_entity)
    
            json_response = JSON.parse(response.body)
    
            expect(json_response['status']['message']).to eq("Email can't be blank, First name can't be blank, Last name can't be blank, Role can't be blank")
          end
        end
      end

    end

    describe "GET /view_trader" do
      context "when an admin wants to view a trader's info" do
        it "returns a JSON response with a success message and trader's information" do
          get "/admin/view_trader/#{non_admin_user.id}"

          expect(response).to have_http_status(:ok)

          json_response = JSON.parse(response.body)

          expect(json_response['data']['email']).to eq("user@example.com")
          expect(json_response['data']['first_name']).to eq("test")
          expect(json_response['data']['last_name']).to eq("test")
          expect(json_response['data']['created_at']).to_not be_nil
          expect(json_response['data']['confirmed_at']).to eq('2023-08-27T00:00:00.000Z')
          expect(json_response['data']['signup_status']).to eq("pending")
        end
      end
      context "when an admin wants to view a non-existent trader" do
        it "raises an error" do
          expect{get "/admin/view_trader/#{0}"}.to raise_error(ActiveRecord::RecordNotFound)
        end
      end
    end

    describe "DELETE /delete_trader" do
      context "when an admin successfully deletes a trader" do
        it "returns a JSON response with a success message" do
          delete "/admin/delete_trader/#{non_admin_user.id}"

          expect(response).to have_http_status(:ok)
          json_response = JSON.parse(response.body)
          expect(json_response['status']['message']).to eq('Trader deletion successful.')
        end
      end
      context "when an admin failed to delete a trader" do
        before(:each) do
          allow(User).to receive(:find).with(non_admin_user.id.to_s).and_return(non_admin_user)
          allow(non_admin_user).to receive(:destroy).and_return(false)
        end
        it "returns a JSON response with an error message" do
          delete "/admin/delete_trader/#{non_admin_user.id}"

          expect(response).to have_http_status(:unprocessable_entity)
          json_response = JSON.parse(response.body)
          expect(json_response['status']['message']).to eq('Trader deletion failed.')
        end
      end
    end

    describe "GET /view_all_traders" do
      context "when an admin wants to see all traders' information" do
        it "returns a JSON response with a success message" do
          user1 = User.create(email: 'user1@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "TRADER" )
          user2 = User.create(email: 'user2@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "TRADER" )

          get "/admin/view_all_traders"

          expect(response).to have_http_status(:ok)
        end
      end
    end

    describe "GET /view_all_pending" do
      context "when an admin wants to see all pending traders' information" do
        it "returns a JSON response with a success message" do
          user1 = User.create(email: 'user1@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "TRADER")
          user2 = User.create(email: 'user2@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "TRADER")

          get "/admin/view_all_pending"

          expect(response).to have_http_status(:ok)
        end
      end
    end

    describe "PATCH /approve_trader" do
      context "when an admin wants to approve a specific trader" do
        it "returns a JSON response with a success message" do
          user = User.create(email: 'user1@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "TRADER")

          patch "/admin/approve_trader/#{non_admin_user.id}"

          expect(response).to have_http_status(:ok)
        end
      end
    end

    describe "GET /view_all_transactions" do
      context "when an admin wants to see all transactions" do
        it "returns a JSON response with a success message" do
          user = User.create(email: 'user1@example.com', password: 'password', first_name: 'test', last_name: 'test', role: "TRADER")
          portfolio1 = user.portfolios.create(name: 'sample portfolio')
          transaction1 = portfolio1.transactions.create(
            market_name: 'STOCK',
            market_order_type: 'MARKET ORDER',
            transaction_type: 'BUY',
            status: 'FILLED',
            symbol: 'AAPL',
            quantity: 10,
            price: 150.00,
          )
          transaction2 = portfolio1.transactions.create(
            market_name: 'STOCK',
            market_order_type: 'MARKET ORDER',
            transaction_type: 'BUY',
            status: 'FILLED',
            symbol: 'GOOGL',
            quantity: 5,
            price: 2500.00,
          )
          transaction3 = portfolio1.transactions.create(
            market_name: 'STOCK',
            market_order_type: 'MARKET ORDER',
            transaction_type: 'SELL',
            status: 'FILLED',
            symbol: 'AAPL',
            quantity: 3,
            price: 155.00,
          )

          get "/admin/view_all_transactions"

          expect(response).to have_http_status(:ok)
        end
      end
    end
  end
  describe "when a trader tries to access" do
    before(:each) do
      sign_in(non_admin_user)
    end
    context "when a non-admin tries to access any of the actions in the controller" do
      it "should send a JSON response with an error message" do
        get "/admin/view_all_transactions"

        expect(response).to have_http_status(:forbidden)

        json_response = JSON.parse(response.body)

        expect(json_response['status']['message']).to eq("You don't have permission to access this page.")
      end
    end
  end
end