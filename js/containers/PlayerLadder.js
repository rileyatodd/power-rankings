import { connect } from 'react-redux'
import { compose, sort } from 'ramda'
import Ladder from '../components/Ladder.js'
import { selectPlayer, postMatch, updateScore } from '../actions/'

const compareRank = (a, b) => a.rank - b.rank

const mapStateToProps = (state) => ({
  items: sort(compareRank, state.players)
})

const mapDispatchToProps = (dispatch) => ({
  onPlayerClick: compose(dispatch, selectPlayer),
  onSubmit: compose(dispatch, postMatch),
  onScoreChange: compose(dispatch, updateScore)
})

let PlayerLadder = connect(mapStateToProps, mapDispatchToProps)(Ladder)

export default PlayerLadder