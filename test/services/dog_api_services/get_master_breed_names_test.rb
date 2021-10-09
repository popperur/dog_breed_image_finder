require 'test_helper'

class GetMasterBreedNamesTest < ActiveSupport::TestCase

  test 'should retrieve the list of master breed names' do
    response = DogApiServices::GetMasterBreedNames.new.call
    assert_equal response.success?, true
    assert_equal response.payload.include?('komondor'), true
  end

end
