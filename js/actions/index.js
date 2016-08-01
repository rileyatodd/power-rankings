import { compose, map, prop } from 'ramda'
import { throwErr, getJSON, postJSON } from '../util'

export const RECORD_MATCH = 'RECORD_MATCH'
export const ADD_PLAYER = 'ADD_PLAYER'
export const SELECT_PLAYER = 'SELECT_PLAYER'
export const SUBMIT_MATCH = 'SUBMIT_MATCH'
export const UPDATE_SCORE = 'UPDATE_SCORE'
export const SERVER_REQUEST = 'SERVER_REQUEST'
export const SERVER_RESPONSE = 'SERVER_RESPONSE'

const postAction = action => postJSON('http://localhost:3000/action', action)

const apiRequest = actionCreator => actionArg => (
  (dispatch, getState) => {
    dispatch(beginServerRequest())
    let action = actionCreator(actionArg)
    postAction(action).fork(
      (err) => {
        dispatch(receiveServerResponse())
        throw err
      },
      () => {
        dispatch(receiveServerResponse())
        dispatch(action)
      }
    )
  }
)

export function recordMatch({ winner, loser }) {
  return {
    type: RECORD_MATCH,
    winner,
    loser
  }
}

export function addPlayer(name) {
  return {
    type: ADD_PLAYER,
    name
  }
}

export function updateScore(id, score) {
  return {
    type: UPDATE_SCORE,
    player: {id, score}
  }
}

export function beginServerRequest() {
  return {
    type: SERVER_REQUEST
  }
}

export function receiveServerResponse() {
  return {
    type: SERVER_RESPONSE
  }
}

export const postAddPlayer = apiRequest(addPlayer);

export const postMatch = apiRequest(recordMatch);

export function hydrateState() {
  return (dispatch) => {
    return getJSON('http://localhost:3000/actions').fork(
      throwErr,
      map(compose(dispatch, JSON.parse, prop('json')))
    )
  }
}
