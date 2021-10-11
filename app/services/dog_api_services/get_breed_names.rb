module DogApiServices

  class GetBreedNames
    include Callable
    require 'httparty'

    def initialize(only_master: false)
      @only_master = only_master
    end

    def call
      response = HTTParty.get("https://dog.ceo/api/breeds/list/all").parsed_response
      OpenStruct.new(success?: true, payload: breed_names(response))
    rescue HTTParty::Error => exn
      OpenStruct.new(success?: false, error_message: exn.message)
    end

    private

    def breed_names(response)
      breed_map = response['message']
      master_breeds = breed_map.keys
      if @only_master
        master_breeds
      else
        master_and_sub_breeds = []
        master_breeds.each do |master_breed|
          master_and_sub_breeds << master_breed
          master_and_sub_breeds += breed_map[master_breed].collect { |sub_breed| "#{sub_breed} #{master_breed}"}
        end
        master_and_sub_breeds.sort
      end
    end

  end
end

