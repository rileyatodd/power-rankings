import { combineReducers } from 'redux'
import { reduce, compose, merge, max, 
         map, add, curry, prop, find,
         set, lensIndex, findIndex,
         filter, lensProp, maxBy,
         minBy, concat } from 'ramda'

// Number a :: [a] -> a
const arrayMax = reduce((acc, x) => max(acc, x), -Infinity)

// This is naive because it doesn't worry about collisions in the persistence layer
// Int b :: [a] -> b
const getNextId = compose(add(1), max(0), arrayMax, map(prop('id')))

// Integer a :: a -> b -> Bool
const hasId = curry((id, x) => id === x.id)

// Player a :: a -> a -> a -> a
const updateRank = curry(function(winner, loser, player){
  return (
    winner.rank < loser.rank ?    player :
    player.id == winner.id ?      merge(player, {rank: loser.rank}) :
    player.rank < winner.rank &&
    player.rank >= loser.rank ?   merge(player, {rank: player.rank + 1}) : 
                                  player
  )
})

// Player p :: p -> p
const clearSelected = set(lensProp('selected'), false)

// Player a :: [a] -> [a]
export function players(state = [], action) {

  let playerLens = lensIndex(findIndex(hasId(action.id), state))

  switch (action.type) {

    case 'RECORD_MATCH':
      let competitors = filter((p) => p.selected, state)
      let winner = maxBy(prop('score'), ...competitors)
      let loser = minBy(prop('score'), ...competitors)
      return compose(map(clearSelected), map(updateRank(winner, loser)))(state)

    case 'ADD_PLAYER':
      return concat(
        state,
        {
          id: getNextId(state),
          name: action.name,
          rank: state.length + 1
        }
      )

    case 'SELECT_PLAYER':
      let playerSelected = compose(playerLens, lensProp('selected'))
      return set(playerSelected, true, state)
    case 'UPDATE_SCORE':
      let playerScore = compose(playerLens, lensProp('score'))
      return set(playerScore, action.score, state)
    default:
      return state
  }
}

export default combineReducers({players})