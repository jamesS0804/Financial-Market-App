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
end
