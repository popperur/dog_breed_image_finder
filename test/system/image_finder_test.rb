require 'application_system_test_case'

class ImageFinderTest < ApplicationSystemTestCase

  test 'should visiting index' do
    visit image_finder_index_url
    assert_selector 'h1', text: 'Dog Breed Image Finder'
  end

  test 'should display components' do
    visit image_finder_index_url
    assert_selector 'h3', text: /\AFilter\z/
    assert_selector 'h3', text: /\ABreed Image\z/
  end

  test 'should get random image by master breed name' do
    visit image_finder_index_url
    fill_in 'Breed Name', with: 'spaniel'
    click_on 'Submit'
    sleep 2
    assert_selector '.breed-info', text: 'spaniel'
  end

  test 'should get random image by master + sub-breed name' do
    visit image_finder_index_url
    fill_in 'Breed Name', with: 'irish spaniel'
    click_on 'Submit'
    sleep 2
    assert_selector '.breed-info', text: 'irish'
    assert_selector '.breed-info', text: 'spaniel'
  end

  test 'should show an error if master breed is non-existent' do
    visit image_finder_index_url
    fill_in 'Breed Name', with: 'non-existent'
    click_on 'Submit'
    sleep 2
    assert_selector '.breed-error', text: 'Breed not found (master breed does not exist)'
  end

  test 'should show an error if sub-breed is non-existent' do
    visit image_finder_index_url
    fill_in 'Breed Name', with: 'dang spaniel'
    click_on 'Submit'
    sleep 2
    assert_selector '.breed-error', text: 'Breed not found (sub breed does not exist)'
  end

end
