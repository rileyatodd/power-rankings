import { combineReducers } from 'redux'
import { reduce, compose, merge, max, map, add, curry, prop, set, 
         lensIndex, findIndex, lensProp, maxBy, minBy, concat } from 'ramda'
         
// Number a :: [a] -> a
const arrayMax = reduce((acc, x) => max(acc, x), -Infinity)

// This is naive because it doesn't worry about collisions in the persistence layer
// Int b :: [a] -> b
const getNextId = compose(add(1), max(0), arrayMax, map(prop('id')))

// Integer a :: a -> b -> Bool
const hasId = curry((id, x) => id === x.id)

// Player a :: a -> a -> a -> a
const updateRank = curry((winner, loser, player) => 
  winner.rank <= loser.rank ?
    player :
  player.id == winner.id ?
    merge(player, {rank: loser.rank}) :
  player.rank < winner.rank && player.rank >= loser.rank ?
    merge(player, {rank: player.rank + 1}) : 

    player
)

// Player p :: p -> p
const clearSelected = set(lensProp('selected'), false)

// Player p :: p -> p
const clearScore = set(lensProp('score'), false)

// Player p :: p -> p
const clearInput = compose(clearSelected, clearScore)

// Player p :: [p] -> p
const findWinner = reduce(maxBy(prop('score')), {score: -Infinity})

// Player p :: [p] -> p
const findLoser = reduce(minBy(prop('score')), {score: Infinity})

// Player a :: [a] -> [a]
export function players(state = [], action) {

  let playerWithActionId = lensIndex(findIndex(hasId(action.id), state))

  switch (action.type) {
    case 'RECORD_MATCH': {
      let winner = findWinner(action.competitors)
      let loser = findLoser(action.competitors)
      return map(compose(clearInput, updateRank(winner, loser)), state)
    }
    case 'ADD_PLAYER': {
      return concat(
        state,
        {
          id: getNextId(state),
          name: action.name,
          rank: state.length + 1
        }
      )
    }
    case 'SELECT_PLAYER': {
      let playerSelected = compose(playerWithActionId, lensProp('selected'))
      return set(playerSelected, true, state)
    }
    case 'UPDATE_SCORE': {
      let playerScore = compose(playerWithActionId, lensProp('score'))
      return set(playerScore, action.score, state)
    }
    default: return state
  }
}

export default combineReducers({players})