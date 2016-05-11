import React from 'react'
import { connect } from 'react-redux'
import { addPlayer } from '../actions/'

let AddPlayer = ({ dispatch }) => {
  let input

  return (
    <div style={{width: '160px'}}>
      <input ref={node => {input = node}} />
      <button style={{width: '19px', height: '19px'}} onClick={() => {
        dispatch(addPlayer(input.value))
        input.value = ''
      }}>
        +
      </button>
    </div>
  )
}

export default connect()(AddPlayer)