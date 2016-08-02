import { combineReducers } from 'redux'
import { compose, map, set, lensProp, assoc, assocPath, dissoc, values } from 'ramda'
import { updateRank, updateRecord } from 'model'
import { getNextId } from 'util'

// Player a :: [a] -> [a]
export function players(state = {}, action) {

  switch (action.type) {
    case 'RECORD_MATCH': {
      const { winner, loser } = action
      return map(compose(dissoc('score'), updateRecord(winner, loser), updateRank(winner, loser)), state)
    }
    case 'ADD_PLAYER': {
      const stateArr = values(state)
      const nextId = getNextId(stateArr)
      return assoc(nextId, {
        id: nextId,
        name: action.name,
        rank: stateArr.length + 1,
        record: {wins: 0, losses: 0}
      }, state)
    }
    case 'UPDATE_SCORE': {
      const { id, score } = action.player
      return assocPath([id, 'score'], score, state)
    }
    default: return state
  }
}

export default combineReducers({players})
