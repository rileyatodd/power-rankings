import test from 'tape'
import 'isomorphic-fetch'
import { wrapAsync } from '../../../js/actions'

test(`wrapAsync dispatches beginServerRequest, executes the async function,
      and after that completes dispatches receiveServerResponse`, (t) => {

  t.end()
})