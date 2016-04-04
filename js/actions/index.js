export const RECORD_MATCH = 'RECORD_MATCH'
export const ADD_PLAYER = 'ADD_PLAYER'

export function recordMatch(winnerId, loserId, loserScore) {
  return {
    type: RECORD_MATCH,
    winnerId,
    loserId,
    loserScore
  }
}

export function addPlayer(name) {
  return {
    type: ADD_PLAYER,
    name
  }
}