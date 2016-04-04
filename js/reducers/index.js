import { combineReducers } from 'redux'
import { reduce, compose, merge, max, map, add, curry } from 'ramda'

const arrayMax = reduce((acc, x) => max(acc, x), -Infinity)

const getNextId = compose(add(1), arrayMax, map(x => x.id))

const updateRank = curry(function(winner, loser, player){
  if (player.id === winner.id) {
    return merge(player, {rank: loser.rank}) 
  }
  if (player.rank < winner.rank && player.rank >= loser.rank) {
    return merge(player, {rank: player.rank + 1})
  }
  return player
})

export function players(state = [], action) {
  switch (action.type) {
    case 'RECORD_MATCH':
      let winner = state.find(player => player.id == action.winnerId)
      let loser = state.find(player => player.id == action.loserId)
      if (winner.rank > loser.rank) {
        return state.map(updateRank(winner, loser))
      }
      return state
    case 'ADD_PLAYER':
      let id = state.length > 0 ? getNextId(state) : 1
      return [
        ...state,
        {
          id: id,
          name: action.name,
          rank: state.length + 1
        }
      ]
    default:
      return state
  }
}

export default combineReducers({players})