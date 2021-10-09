import React, { useState } from 'react'
import { array } from 'prop-types'
import { Col, Container, Row } from 'react-bootstrap'
import { api } from '@estatesearch'
import BreedFilter from "./BreedFilter"
import BreedImage from "./BreedImage"

export default function Page({ masterBreedNames }) {
  const [loadingImage, setLoadingImage] = useState(false)
  const filterState = useState({
      breedName: '',
    })
  const [filter] = filterState
  const [breedImageInfo, setBreedImageInfo] = useState({
    masterBreedName: null,
    subBreedName: null,
    imageUrl: null,
    errorMessage: null,
  })

  const updateBreedImage = async () => {
    setLoadingImage(true)
    let masterBreedName
    let subBreedName = ''
    const words = filter.breedName.split(' ')
    if (words.length === 1) {
      // master breed name is defined
      masterBreedName = filter.breedName
    } else {
      // first word is the sub, the rest is the master breed
      // irish spaniel
      subBreedName = words.shift()
      masterBreedName = words.join(' ')
    }

    const response = await api.get('/image_finder/random_breed_image', {
      master_breed_name: masterBreedName,
      sub_breed_name: subBreedName,
    })
    setLoadingImage(false)
    setBreedImageInfo({
      ...breedImageInfo,
      masterBreedName,
      subBreedName,
      imageUrl: response.image_url,
      errorMessage: response.error_message,
    })
  }

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h1 className='text-center my-4'>Dog Breed Image Finder</h1>
          <Row>
            <Col>
              <BreedFilter
                filterState={filterState}
                loading={loadingImage}
                masterBreedNames={masterBreedNames}
                onUpdateFilter={updateBreedImage}
              />
            </Col>
            <Col md={1} />
            <Col>
              <BreedImage breedImageInfo={breedImageInfo} />
            </Col>
          </Row>
        </Col>

      </Row>
    </Container>

  )


}

Page.propTypes = {
	masterBreedNames: array.isRequired,
}
