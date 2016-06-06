import { chain, filter, compose, map, prop } from 'ramda'
import { getJSON, postJSON } from '../util'

export const RECORD_MATCH = 'RECORD_MATCH'
export const ADD_PLAYER = 'ADD_PLAYER'
export const SELECT_PLAYER = 'SELECT_PLAYER'
export const SUBMIT_MATCH = 'SUBMIT_MATCH'
export const UPDATE_SCORE = 'UPDATE_SCORE'
export const SERVER_REQUEST = 'SERVER_REQUEST'
export const SERVER_RESPONSE = 'SERVER_RESPONSE'

const postAction = (action) => fetch('http://localhost:3000/action', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(action)
})

const postAction2 = action => postJSON('http://localhost:3000/action', action)

const apiRequest = (dispatch, action) => {
  dispatch(beginServerRequest())
  return postAction(action)
    .then(() => dispatch(receiveServerResponse()))
    .then(() => dispatch(action))
}


export const wrapAsync = (dispatch, asyncFunction) => {
  dispatch(beginServerRequest())
  return chain(compose(dispatch, receiveServerResponse), asyncFunction())
}

const apiRequest2 = (dispatch, action) => {
  dispatch(beginServerRequest())
  postAction2(action).fork(
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

export function recordMatch(competitors) {
  return {
    type: RECORD_MATCH,
    competitors
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
    score: parseInt(score)
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

export function postAddPlayer(name) {
  return (dispatch) => {
    return apiRequest(dispatch, addPlayer(name))
  }
}

export function postMatch() {
  return (dispatch, getState) => {
    return apiRequest(dispatch, recordMatch(filter((p) => p.selected, getState().players)))
  }
}

export function hydrateState() {
  return (dispatch) => {
    return getJSON('http://localhost:3000/actions').fork(
      (err) => {throw err},
      map(compose(dispatch, JSON.parse, prop('json')))
    )
  }
}