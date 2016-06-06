import test from 'tape'
import 'isomorphic-fetch'
import { wrapAsync } from '../../../js/actions'

const mockDispatch = () => {
  let actions = [];
  return (action) => {
    actions.push(action);
  }
}

const mockFunction = () => {
  let calls = []
  let successes = []
  let failures = []
  return (...args) => {
    calls.push(args)
  }
}

test(`wrapAsync dispatches beginServerRequest, executes the async function,
      and after that completes dispatches receiveServerResponse`, (t) => {

  let asyncMock = mockFunction()
  wrapAsync(asyncMock)
})