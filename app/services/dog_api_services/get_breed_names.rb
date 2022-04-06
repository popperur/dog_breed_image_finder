module DogApiServices

  class GetBreedNames
    include Callable

    def initialize(only_master: false)
      @only_master = only_master
    end

    def call
      response = Net::HTTP.get_response(URI('https://dog.ceo/api/breeds/list/all'))
      if response.code != '200'
        raise "Request failed, code: #{response.code}, message: #{response.message}."
      end
      data = JSON.parse(response.body)
      OpenStruct.new(success?: true, payload: breed_names(data))
    rescue StandardError => exn
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

