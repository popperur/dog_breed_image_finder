module DogApiServices

  class GetMasterBreedNames
    require 'httparty'

    def call
      response = HTTParty.get("https://dog.ceo/api/breeds/list/all").parsed_response
      OpenStruct.new(success?: true, payload: master_breed_names(response))
    rescue HTTParty::Error => exn
      OpenStruct.new(success?: false, error_message: exn.message)
    end

    private

    def master_breed_names(response)
      response['message'].keys
    end

  end
end

