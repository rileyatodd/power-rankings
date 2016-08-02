import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { map, compose, sortBy, values, prop } from 'ramda'
import { postMatch, recordMatch } from 'actions'
import { findWinnerAndLoser } from 'model'
import Player from 'components/Player'
import AddPlayer from 'components/AddPlayer'
import styles from './PlayerLadder.css'

const Ladder = ({ players, recordMatch }) => (
  <div className={styles.container}>
    <h2>Ping Pong Power Rankings</h2>
    <form id="scoreSheet" onSubmit={e => {recordMatch(players); e.preventDefault();}}/>
    <ol className={styles.list}>
      {map(player => <Player key={player.id} formId="scoreSheet" {...player} />, players)}
    </ol>
    <div className={styles.controlsContainer}>
      <button className={styles.submitButton} form="scoreSheet">Submit Match</button>
      <AddPlayer />
    </div>
  </div>
)

Ladder.propTypes = {
  players: PropTypes.array.isRequired,
  recordMatch: PropTypes.func
}

const mapStateToProps = (state) => ({
  players: sortBy(prop('rank'), values(state.players))
})

const mapDispatchToProps = (dispatch) => ({
  recordMatch: compose(dispatch, recordMatch, findWinnerAndLoser)
})

let PlayerLadder = connect(mapStateToProps, mapDispatchToProps)(Ladder)

export default PlayerLadder
