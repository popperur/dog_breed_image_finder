require 'test_helper'

class ImageFinderControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get image_finder_index_url
    assert_response :success
  end

  test 'should retrieve a random image for an existing breed name' do
    get random_breed_image_image_finder_index_url, params: {master_breed_name: 'komondor'}
    json = JSON.parse(response.body)
    assert_includes json['image_url'], 'https://images.dog.ceo/breeds/komondor'
  end

  test 'should retrieve a random image for an existing breed + sub-breed name' do
    get random_breed_image_image_finder_index_url, params: {master_breed_name: 'setter', sub_breed_name: 'irish'}
    json = JSON.parse(response.body)
    assert_includes json['image_url'], 'https://images.dog.ceo/breeds/setter-irish'
  end

  test 'should retrieve a random image case insensitively' do
    get random_breed_image_image_finder_index_url, params: {master_breed_name: 'KomondOR'}
    json = JSON.parse(response.body)
    assert_includes json['image_url'], 'https://images.dog.ceo/breeds/komondor'
    get random_breed_image_image_finder_index_url, params: {master_breed_name: 'seTTer', sub_breed_name: 'IRish'}
    json = JSON.parse(response.body)
    assert_includes json['image_url'], 'https://images.dog.ceo/breeds/setter-irish'
  end

  test 'should retrieve an error message for a blank breed name' do
    response = DogApiServices::GetRandomBreedImage.new({}).call
    assert_equal response.success?, false
    assert_equal response.error_message, 'Master breed name is not defined'
  end

  test 'should retrieve an error message for a non-existent breed name' do
    get random_breed_image_image_finder_index_url, params: {master_breed_name: 'not-existent breed'}
    json = JSON.parse(response.body)
    assert_equal json['error_message'], 'Breed not found (master breed does not exist)'
  end

  test 'should retrieve an error message for a non-existent sub-breed name' do
    get random_breed_image_image_finder_index_url, params: {master_breed_name: 'setter', sub_breed_name: 'martian'}
    json = JSON.parse(response.body)
    assert_equal json['error_message'], 'Breed not found (sub breed does not exist)'
  end

end
