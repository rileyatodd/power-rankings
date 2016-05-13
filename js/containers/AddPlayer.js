import React, { PropTypes } from 'react'
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

AddPlayer.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(AddPlayer)