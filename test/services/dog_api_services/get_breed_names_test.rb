require 'test_helper'

class GetBreedNamesTest < ActiveSupport::TestCase

  test 'should retrieve the list of master breed names' do
    response = DogApiServices::GetBreedNames.call(only_master: true)
    assert_equal response.success?, true
    assert_equal response.payload.include?('komondor'), true
    assert_equal response.payload.include?('miniature schnauzer'), false
  end

  test 'should retrieve the list of master + sub-breed names' do
    response = DogApiServices::GetBreedNames.call
    assert_equal response.success?, true
    assert_equal response.payload.include?('komondor'), true
    assert_equal response.payload.include?('miniature schnauzer'), true
  end

end
