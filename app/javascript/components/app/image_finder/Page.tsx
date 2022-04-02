import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import axios from 'axios'
import BreedFilter from "./BreedFilter"
import BreedImage from "./BreedImage"
import { BreedImageInfo} from "./interface";


type PageProps = {
  breedNames: string[]
}

const Page = ({ breedNames }:PageProps) => {
  const [loadingImage, setLoadingImage] = useState<boolean>(false)
  const [breedImageInfo, setBreedImageInfo] = useState<BreedImageInfo>({
    masterBreedName: null,
    subBreedName: null,
    imageUrl: null,
    errorMessage: null,
  })

  const updateBreedImage = async (breedName:string) => {
    setLoadingImage(true)
    let masterBreedName:string
    let subBreedName = ''
    const words = breedName.split(' ')
    if (words.length === 1) {
      // master breed name is defined
      masterBreedName = breedName
    } else {
      // first word is the sub, the rest is the master breed
      // irish spaniel
      subBreedName = words.shift()
      masterBreedName = words.join(' ')
    }

    const response = await axios.get('/image_finder/random_breed_image', {
      params: {
        master_breed_name: masterBreedName,
        sub_breed_name: subBreedName,
      }
    })
    let errorMessage:string
    let imageUrl = null
    if (response.status === 200) {
      imageUrl = response.data.image_url
      errorMessage = response.data.error_message
    } else {
      errorMessage = `Request failed, status: ${response.status}`
    }
    setLoadingImage(false)
    setBreedImageInfo({...breedImageInfo, masterBreedName, subBreedName, imageUrl, errorMessage})
  }

  const onUpdateFilter = (breedName: string) => {
    void updateBreedImage(breedName)
  }

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h1 className='text-center my-4'>Dog Breed Image Finder</h1>
          <Row>
            <Col>
              <BreedFilter
                breedNames={breedNames}
                loading={loadingImage}
                onUpdateFilter={onUpdateFilter}
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

export default Page
