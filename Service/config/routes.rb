Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  post "admin/create_trader" => "admins#create_trader"
  patch "admin/edit_trader/:user_id" => "admins#edit_trader"
  get "admin/view_trader/:user_id" => "admins#view_trader"
  delete "admin/delete_trader/:user_id" => "admins#delete_trader"
  get "admin/view_all_traders" => "admins#view_all_traders"
  get "admin/view_all_pending" => "admins#view_all_pending"
  patch "admin/approve_trader/:user_id" => "admins#approve_trader"
end
