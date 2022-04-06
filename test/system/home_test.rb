require 'application_system_test_case'

class HomeTest < ApplicationSystemTestCase

  test 'should visiting index' do
    visit home_index_url
    assert_selector 'h1', text: 'Dog Breed Image Finder'
  end

  test 'should display components' do
    visit home_index_url
    assert_selector 'h3', text: /\ADoggo Filter\z/
    assert_selector 'h3', text: /\ADoggo Image\z/
  end

  test 'should get random image by master breed name' do
    visit home_index_url

    find('.rbt', match: :first).click # click the typeahead control
    find('a', text: 'akita', match: :first).click
    sleep 2
    assert_selector '.breed-info', text: 'akita'
  end

  test 'should get random image by master + sub-breed name' do
    visit home_index_url

    find('.rbt', match: :first).click # click the typeahead control
    find('a', text: 'american terrier', match: :first).click
    sleep 2
    assert_selector '.breed-info', text: 'american'
    assert_selector '.breed-info', text: 'terrier'
  end

end
