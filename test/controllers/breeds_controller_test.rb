require 'test_helper'

class BreedsControllerTest < ActionDispatch::IntegrationTest
  test 'should get breed names' do
    get breeds_url
    assert_response :success
    json = JSON.parse(response.body)
    assert_equal json['breed_names'].length > 0, true
  end

  test 'should retrieve a random image for an existing breed name' do
    get random_image_breeds_url, params: {master_breed_name: 'komondor'}
    json = JSON.parse(response.body)
    assert_includes json['image_url'], 'https://images.dog.ceo/breeds/komondor'
  end

  test 'should retrieve a random image for an existing breed + sub-breed name' do
    get random_image_breeds_url, params: {master_breed_name: 'setter', sub_breed_name: 'irish'}
    json = JSON.parse(response.body)
    assert_includes json['image_url'], 'https://images.dog.ceo/breeds/setter-irish'
  end

  test 'should retrieve a random image case insensitively' do
    get random_image_breeds_url, params: {master_breed_name: 'KomondOR'}
    json = JSON.parse(response.body)
    assert_includes json['image_url'], 'https://images.dog.ceo/breeds/komondor'
    get random_image_breeds_url, params: {master_breed_name: 'seTTer', sub_breed_name: 'IRish'}
    json = JSON.parse(response.body)
    assert_includes json['image_url'], 'https://images.dog.ceo/breeds/setter-irish'
  end

  test 'should retrieve an error message for a blank breed name' do
    get random_image_breeds_url, params: {master_breed_name: ''}
    json = JSON.parse(response.body)
    assert_equal json['error_message'], 'Master breed name is not defined.'
  end

  test 'should retrieve an error message for a non-existent breed name' do
    get random_image_breeds_url, params: {master_breed_name: 'not-existent breed'}
    json = JSON.parse(response.body)
    assert_equal json['error_message'], 'Breed does not exist.'
  end

  test 'should retrieve an error message for a non-existent sub-breed name' do
    get random_image_breeds_url, params: {master_breed_name: 'setter', sub_breed_name: 'martian'}
    json = JSON.parse(response.body)
    assert_equal json['error_message'], 'Breed does not exist.'
  end

end
