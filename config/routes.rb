Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'home#index'
  get 'channels/*path', to: 'home#index'
  get 'hls/*path', to: 'home#index'
  get 'local/*path', to: 'home#index'
  get 'asuka', to: 'home#index'

  namespace :api do
    namespace :v1 do
      resources :channels do
        collection do
          get :ip
        end
      end
    end
  end
end
