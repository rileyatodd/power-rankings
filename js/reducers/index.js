import { combineReducers } from 'redux'
import { reduce, compose, merge, max, map, add, curry, prop, find, equals } from 'ramda'

// Number a :: [a] -> a
const arrayMax = reduce((acc, x) => max(acc, x), -Infinity)

// This is naive because it doesn't worry about collisions in the persistence layer
// Int b :: [a] -> b
const getNextId = compose(add(1), max(0), arrayMax, map(prop('id')))

// Integer a :: a -> b -> Bool
const hasId = curry((id, x) => id === x.id)

// Player a :: a -> a -> a -> a
const updateRank = curry(function(winner, loser, player){
  if (player.id === winner.id) {
    return merge(player, {rank: loser.rank}) 
  }
  if (player.rank < winner.rank && player.rank >= loser.rank) {
    return merge(player, {rank: player.rank + 1})
  }
  return player
})

// Player a :: [a] -> [a]
export function players(state = [], action) {
  switch (action.type) {
    case 'RECORD_MATCH':
      let winner = find(hasId(action.winnerId), state)
      let loser = find(hasId(action.loserId), state)
      if (winner.rank > loser.rank) {
        return map(updateRank(winner, loser), state)
      }
      return state
    case 'ADD_PLAYER':
      return [
        ...state,
        {
          id: getNextId(state),
          name: action.name,
          rank: state.length + 1
        }
      ]
    default:
      return state
  }
}

export default combineReducers({players})