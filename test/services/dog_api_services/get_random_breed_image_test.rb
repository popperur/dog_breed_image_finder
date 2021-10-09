require 'test_helper'

class GetRandomBreedImageTest < ActiveSupport::TestCase

  test 'should retrieve a random image for an existing breed name' do
    response = DogApiServices::GetRandomBreedImage.new({master_breed_name: 'komondor'}).call
    assert_equal response.success?, true
    assert_includes response.payload, 'https://images.dog.ceo/breeds/komondor'
  end

  test 'should retrieve a random image for an existing breed + sub-breed name' do
    response = DogApiServices::GetRandomBreedImage.new({master_breed_name: 'setter', sub_breed_name: 'irish'}).call
    assert_equal response.success?, true
    assert_includes response.payload, 'https://images.dog.ceo/breeds/setter-irish'
  end

  test 'should retrieve a random image case insensitively' do
    response = DogApiServices::GetRandomBreedImage.new({master_breed_name: 'KomondOR'}).call
    assert_equal response.success?, true
    assert_includes response.payload, 'https://images.dog.ceo/breeds/komondor'
    response = DogApiServices::GetRandomBreedImage.new(
      {master_breed_name: 'seTTer', sub_breed_name: 'IRish'}).call
    assert_equal response.success?, true
    assert_includes response.payload, 'https://images.dog.ceo/breeds/setter-irish'
  end

  test 'should retrieve an error message for a blank breed name' do
    response = DogApiServices::GetRandomBreedImage.new({master_breed_name: nil}).call
    assert_equal response.success?, false
    assert_equal response.error_message, 'Master breed name is not defined'
  end

  test 'should retrieve an error message for a non-existent breed name' do
    response = DogApiServices::GetRandomBreedImage.new({master_breed_name: 'not-existent breed'}).call
    assert_equal response.success?, false
    assert_equal response.error_message, 'Breed not found (master breed does not exist)'
  end

  test 'should retrieve an error message for a non-existent sub-breed name' do
    response = DogApiServices::GetRandomBreedImage.new({master_breed_name: 'setter', sub_breed_name: 'martian'}).call
    assert_equal response.success?, false
    assert_equal response.error_message, 'Breed not found (sub breed does not exist)'
  end

end