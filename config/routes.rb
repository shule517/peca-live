Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'home#index'
  get 'channels/*path', to: 'home#index'
  get 'hls/*path', to: 'home#index'
  get 'local/*path', to: 'home#index'
  get 'asuka', to: 'home#index'
  get 'about', to: 'home#index'
  get 'user_devices', to: 'home#user_devices'
  get 'user_icons/:jpnkn_id', to: 'user_icons#show'

  namespace :api do
    namespace :v1 do
      resource :csrf_token, only: %i(show)
      resource :peercast, only: %i(show)
      resources :accounts, only: %i(create) do
        collection do
          get :sign_out
        end
      end

      resources :channels do
        collection do
          get :notification_broadcasting
          get :record_history
          get :broadcasting
          get :check_port
          get :bump
          resources :private, controller: 'channels/private', param: :channel_name, only: %i(show destroy)
        end
      end

      resources :favorites do
        collection do
          delete :destroy
        end
      end

      resource :bbs, only: %i(show) do
        resource :threads, only: %i(show)
        resource :comments, only: %i(show)
      end
    end
  end
end
