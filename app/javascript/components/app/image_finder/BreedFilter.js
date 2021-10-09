import React from 'react'
import { array, bool, func } from 'prop-types'
import { Button, Col, Form, Row } from "react-bootstrap"

export default function BreedFilter({ filterState, loading, masterBreedNames, onUpdateFilter }) {
  const [filter, setFilter] = filterState

  const updateBreedName = (event) => setFilter({...filter, breedName: event.target.value})

  const isFilterValid = () => Boolean(filter.breedName)

  const handleBreedNameKeyDown = (event) => {
    if (event.key === 'Enter' && !loading) {
      event.preventDefault()
      onUpdateFilter()
    }
  }

  return (
    <Row>
      <Col className='rounded-3 border shadow-lg pb-4'>
        <h3 className='my-2'>Filter</h3>
        <Form>
          <Form.Group className='mb-3' controlId='breedName'>
            <Form.Label>Breed Name</Form.Label>
            <Form.Control onChange={updateBreedName} onKeyDown={handleBreedNameKeyDown} type='text' value={filter.breedName} />
            <Form.Text className='text-muted'>Examples: spaniel, irish spaniel, hound, basset hound </Form.Text>
          </Form.Group>
        </Form>
        <Button
          className='float-end'
          disabled={loading || !isFilterValid()}
          onClick={onUpdateFilter}
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
	masterBreedNames: [],
}

BreedFilter.propTypes = {
  filterState: array.isRequired,
  loading: bool.isRequired,
  masterBreedNames: array,
  onUpdateFilter: func.isRequired,
}

