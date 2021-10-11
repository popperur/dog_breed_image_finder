class ImageFinderController < ApplicationController

  def index
    @master_breed_names = Rails.cache.fetch('master_breed_names', expires_in: 1.day) do
      DogApiServices::GetBreedNames.call.payload
    end
  end

  def random_breed_image
    response = DogApiServices::GetRandomBreedImage.call(
      master_breed_name: params[:master_breed_name],
      sub_breed_name: params[:sub_breed_name]
    )
    render json: { image_url: response.payload, error_message: response.error_message }
  end
end
