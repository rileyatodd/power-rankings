import React from 'react'
import { connect } from 'react-redux'
import { compose, map, sort } from 'ramda'


const compareRank = (player1, player2) => player1.rank - player2.rank

const renderPlayer = player => (
  <li key={player.id} style={{padding: '5px 0'}}>
    {player.name}
    <input style={{float: 'right', width: '30px'}}type="number" />
  </li>
)

const renderPlayers = compose(map(renderPlayer), sort(compareRank))


let renderPlayerLadder = ({ players }) => (
  <ol style={{width: '200px'}}>
    {renderPlayers(players)}
  </ol>
)


const mapStateToProps = (state) => {
  return {players: state.players} 
}

let PlayerLadder = connect(mapStateToProps)(renderPlayerLadder)

export default PlayerLadder