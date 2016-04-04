import React from 'react'
import { connect } from 'react-redux'
import { addPlayer } from '../actions/'

let AddPlayer = ({ dispatch }) => {
  let input

  return (
    <div>
      <input ref={node => {input = node}} />
      <button onClick={() => {
        dispatch(addPlayer(input.value))
        input.value = ''
      }}>
        Add Player 
      </button>
    </div>
  )
}

AddPlayer = connect()(AddPlayer)

export default AddPlayer