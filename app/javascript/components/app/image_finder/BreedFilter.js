import React, { useCallback, useState } from 'react'
import { array, bool, func } from 'prop-types'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'

export default function BreedFilter({ loading, breedNames, onUpdateFilter }) {
  const [selectedBreedNames, setSelectedBreedNames] = useState([])

  const isFilterValid = () => Boolean(selectedBreedNames[0])

  const updateFilter = () => {
    if (selectedBreedNames[0]) onUpdateFilter(selectedBreedNames[0])
  }

  return (
    <Row>
      <Col className='rounded-3 border shadow-lg pb-4'>
        <h3 className='my-2'>Filter</h3>
        <Form autoComplete='off'>
          <Form.Group className='mb-3' controlId='breedName'>
            <Form.Label>Breed Name</Form.Label>
            <Typeahead
              id='breed_name'
              onChange={setSelectedBreedNames}
              options={breedNames}
              selected={selectedBreedNames}
            />
            <Form.Text className='text-muted'>Examples: spaniel, irish spaniel, hound, basset hound </Form.Text>
          </Form.Group>
        </Form>
        <Button
          className='float-end'
          disabled={loading || !isFilterValid()}
          onClick={updateFilter}
          type='button'
          variant='success'
        >Submit
        </Button>

        <div className='m-2' />
      </Col>
    </Row>
  )

}

BreedFilter.defaultProps = {
	breedNames: [],
}

BreedFilter.propTypes = {
  breedNames: array,
  loading: bool.isRequired,
  onUpdateFilter: func.isRequired,
}

