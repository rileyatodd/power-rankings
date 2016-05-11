export const RECORD_MATCH = 'RECORD_MATCH'
export const ADD_PLAYER = 'ADD_PLAYER'
export const SELECT_PLAYER = 'SELECT_PLAYER'
export const SUBMIT_MATCH = 'SUBMIT_MATCH'
export const UPDATE_SCORE = 'UPDATE_SCORE'

export function recordMatch() {
  return {
    type: RECORD_MATCH
  }
}

export function addPlayer(name) {
  return {
    type: ADD_PLAYER,
    name
  }
}

export function selectPlayer(id) {
  return {
    type: SELECT_PLAYER,
    id
  }
}

export function updateScore(id, score) {
  return {
    type: UPDATE_SCORE,
    id,
    score
  }
}