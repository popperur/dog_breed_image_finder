module DogApiServices

  class GetRandomBreedImage
    include Callable
    require 'httparty'

    def initialize(master_breed_name:, sub_breed_name: nil)
      @master_breed_name = master_breed_name
      @sub_breed_name = sub_breed_name
    end

    def call
      response = HTTParty.get("https://dog.ceo/api#{breed_endpoint}").parsed_response
      success = response['status'] == 'success'
      OpenStruct.new(
        success?: success,
        payload: success ? random_image_url(response) : nil,
        error_message: success ? nil : response['message']
      )
    rescue HTTParty::Error, ArgumentError => exn
      OpenStruct.new(success?: false, error_message: exn.message)
    end

    private

    def breed_endpoint
      raise ArgumentError.new('Master breed name is not defined') if @master_breed_name.blank?

      master = @master_breed_name.downcase
      sub = @sub_breed_name.present? ? @sub_breed_name.downcase : nil
      URI.escape("/breed/#{master}#{sub ? '/' + sub : ''}/images/random")
    end

    def random_image_url(response)
      response['message']
    end

  end
end

