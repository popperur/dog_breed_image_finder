Rails.application.routes.draw do

  resources :home, only: [:index]

  resources :breeds, only: [:index] do
    get :random_image, on: :collection
  end


  root 'home#index'

end
