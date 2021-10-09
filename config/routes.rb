Rails.application.routes.draw do

  resources :image_finder, only: [:index] do
    collection do
      get 'random_breed_image'
    end
  end

  root 'image_finder#index'

end
