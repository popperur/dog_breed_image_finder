class ImageFinderController < ApplicationController

  def index
    @master_breed_names = Rails.cache.fetch('master_breed_names', expires_in: 1.day) do
      DogApiServices::GetMasterBreedNames.new.call.payload
    end
  end

  def random_breed_image
    response = DogApiServices::GetRandomBreedImage.new(params.slice(:master_breed_name, :sub_breed_name)).call
    render json: { image_url: response.payload, error_message: response.error_message }
  end
end
