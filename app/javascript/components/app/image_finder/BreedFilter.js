import React, { useRef, useState } from 'react'
import { array, bool, func } from 'prop-types'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'

export default function BreedFilter({ loading, breedNames, onUpdateFilter }) {
  const [selectedBreedNames, setSelectedBreedNames] = useState([])
  const [submittedBreedName, setSubmittedBreedName] = useState(null)
  const typeaheadRef = useRef(null)

  const selectedBreedName = selectedBreedNames[0] // we support single selections only

  const updateSelection = (breedNames) => {
    setSelectedBreedNames(breedNames)
    setSubmittedBreedName(null)
  }

  const isFilterValid = () => Boolean(selectedBreedName)

  const updateFilter = (selectedBreedName) => {
    if (selectedBreedName) {
      onUpdateFilter(selectedBreedName)
      setSubmittedBreedName(selectedBreedName)
    }
  }

  const onTypeaheadMenuToggle = (isOpen) => {
    if (!isOpen) {
      updateFilter(typeaheadRef.current.state.selected[0])
    }
  }

  const onTypeaheadKeyDown = (event) => {
    if (event.keyCode === 13) {
      updateFilter(typeaheadRef.current.state.selected[0])
    }
  }

  const onSubmitClick = () => {
    updateFilter(selectedBreedName)
  }

  return (
    <Row>
      <Col className='rounded-3 border shadow-lg pb-4'>
        <h3 className='my-2'>Doggo Filter</h3>
        <Form autoComplete='off'>
          <Form.Group className='mb-3' controlId='breedName'>
            <Form.Label>Breed Name</Form.Label>
            <Typeahead
              id='typeahead_breed_name'
              inputProps={{id: 'breedName'}}
              onChange={updateSelection}
              onKeyDown={onTypeaheadKeyDown}
              onMenuToggle={onTypeaheadMenuToggle}
              options={breedNames}
              ref={typeaheadRef}
              selected={selectedBreedNames}
            />
            <Form.Text className='text-muted'>Examples: spaniel, irish spaniel, hound, basset hound </Form.Text>
          </Form.Group>
        </Form>
        <Button
          className='float-end'
          disabled={loading || !isFilterValid()}
          onClick={onSubmitClick}
          type='button'
          variant='success'
        >{submittedBreedName ? 'Show me one more!' : 'Show me!'}
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

