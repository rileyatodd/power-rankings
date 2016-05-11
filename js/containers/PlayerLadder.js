import React from 'react'
import { connect } from 'react-redux'
import { compose, map, sort, prop } from 'ramda'
import Ladder from '../components/Ladder.js'
import { selectPlayer, recordMatch, updateScore } from '../actions/'

const compareRank = (a, b) => a.rank - b.rank

const mapStateToProps = (state) => ({
  items: sort(compareRank, state.players),
})

const mapDispatchToProps = (dispatch) => ({
  onPlayerClick: compose(dispatch, selectPlayer),
  onSubmit: compose(dispatch, recordMatch),
  onScoreChange: compose(dispatch, updateScore)
})

let PlayerLadder = connect(mapStateToProps, mapDispatchToProps)(Ladder)

export default PlayerLadder