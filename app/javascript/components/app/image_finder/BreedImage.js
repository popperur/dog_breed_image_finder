import {Col, Row} from "react-bootstrap"
import React from "react"
import { shape, string } from "prop-types"
import styled from "styled-components"

const BreedImageRow = styled(Row)`
  .breed-image {
    max-width: 100%;
    height: auto;
    max-height: 300px;
  }
  .breed-info, .breed-error {
    font-size: 12px;
  }
`
export default function BreedImage({ breedImageInfo }) {
  return (
    <BreedImageRow>
      <Col className='rounded-3 border shadow-lg pb-4'>
        <h3 className='my-2'>Doggo Image</h3>
        {breedImageInfo.errorMessage && <div className='breed-error'>{breedImageInfo.errorMessage}</div>}
        {breedImageInfo.imageUrl &&
          <>
            <div className='breed-info'><strong>Master Breed:</strong> {breedImageInfo.masterBreedName}</div>
            {breedImageInfo.subBreedName &&
              <div className='breed-info'><strong>Sub-breed:</strong> {breedImageInfo.subBreedName}</div>}
            <img alt='breed' className='breed-image my-2' src={breedImageInfo.imageUrl} />
          </>}
      </Col>
    </BreedImageRow>
  )

}

BreedImage.propTypes = {
  breedImageInfo: shape({
    masterBreedName: string,
    subBreedName: string,
    imageUrl: string,
    errorMessage: string,
  }),
}

