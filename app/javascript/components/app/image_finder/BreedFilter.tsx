import React, { useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import {Typeahead, TypeaheadState} from 'react-bootstrap-typeahead'


type BreedFilterProps = {
  loading: boolean
  breedNames: string[]
  onUpdateFilter: (breedName: string) => void
}

const BreedFilter = ({ loading, breedNames, onUpdateFilter }:BreedFilterProps) => {
  const [selectedBreedNames, setSelectedBreedNames] = useState<string[]>([])
  const [submittedBreedName, setSubmittedBreedName] = useState<string | null>(null)
  const typeaheadRef = useRef(null)

  const selectedBreedName = selectedBreedNames[0] // we support single selections only

  const updateSelection = (breedNames:string[]) => {
    setSelectedBreedNames(breedNames)
    setSubmittedBreedName(null)
  }

  const isFilterValid = () => Boolean(selectedBreedName)

  const updateFilter = (selectedBreedName:string) => {
    if (selectedBreedName) {
      onUpdateFilter(selectedBreedName)
      setSubmittedBreedName(selectedBreedName)
    }
  }

  const getTypeaheadInnerState = ():TypeaheadState<string> => {
    return typeaheadRef.current.state
  }

  const onTypeaheadMenuToggle = (isOpen:boolean) => {
    if (!isOpen) updateFilter(getTypeaheadInnerState().selected[0])
  }

  const onTypeaheadKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Enter') updateFilter(getTypeaheadInnerState().selected[0])
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
      </Col>
    </Row>
  )

}

export default BreedFilter
