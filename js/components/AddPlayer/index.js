import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { compose } from 'ramda'
import { addPlayer, postAddPlayer } from 'actions'
import styles from './AddPlayer.css'

let AddPlayer = ({ addPlayer }) => {
  let input

  return (
    <form className={styles.container} onSubmit={e => {
      addPlayer(input.value)
      e.preventDefault()
      e.target.reset()
    }}>
      <input className={styles.input} ref={node => {input = node}} />
      <button className={styles.button}>
        <i className="fa fa-user-plus" />
      </button>
    </form>
  )
}

AddPlayer.propTypes = {
  addPlayer: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  addPlayer: compose(dispatch, addPlayer)
})

export default connect(null, mapDispatchToProps)(AddPlayer)
