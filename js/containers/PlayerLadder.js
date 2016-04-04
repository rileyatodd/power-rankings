import React from 'react'
import { connect } from 'react-redux'
import { compose, map, sort } from 'ramda'


const compareRank = (player1, player2) => player1.rank - player2.rank

const renderPlayer = player => <li key={player.id}>{player.name}</li>

const renderPlayerList = compose(map(renderPlayer), sort(compareRank))


let PlayerLadder = ({ players }) => (
  <ul>{renderPlayerList(players)}</ul>
)


const mapStateToProps = (state) => {
  return {players: state.players}
}

PlayerLadder = connect(mapStateToProps)(PlayerLadder)

export default PlayerLadder