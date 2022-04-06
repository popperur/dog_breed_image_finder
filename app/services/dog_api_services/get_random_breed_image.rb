module DogApiServices

  class GetRandomBreedImage
    include Callable

    def initialize(master_breed_name:, sub_breed_name: nil)
      @master_breed_name = master_breed_name
      @sub_breed_name = sub_breed_name
    end

    def call
      response = Net::HTTP.get_response(URI("https://dog.ceo/api#{breed_endpoint}"))
      if response.code == '404'
        raise ArgumentError.new('Breed does not exist.')
      elsif response.code != '200'
        raise "Request failed, code: #{response.code}, message: #{response.message}."
      end
      data = JSON.parse(response.body)
      OpenStruct.new(success?: true, payload: random_image_url(data))
    rescue StandardError => exn
      OpenStruct.new(success?: false, error_message: exn.message)
    end

    private

    def breed_endpoint
      raise ArgumentError.new('Master breed name is not defined.') if @master_breed_name.blank?

      master = @master_breed_name.downcase
      sub = @sub_breed_name.present? ? @sub_breed_name.downcase : nil
      URI.escape("/breed/#{master}#{sub ? '/' + sub : ''}/images/random")
    end

    def random_image_url(response)
      response['message']
    end

  end
end

