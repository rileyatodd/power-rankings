import { request, getJSON } from '../../../js/util/'
import test from 'tape'
import 'isomorphic-fetch'
import { prop } from 'ramda'

test('request returns a Task Error Response', (t) => {
  request('http://localhost:3000/actions', {}).fork(
    (err) => t.ok(err instanceof Error, 'reject clause of fork is handed an Error'),
    (response) => t.ok(response.body && response.headers, 'result of request is a response object')
  )

  request('null', {}).fork(
    (err) => t.ok(err instanceof Error, 'reject clause of fork is handed an Error'),
    (response) => t.ok(response.body && response.headers, 'result of request is a response object')
  )

  t.end()
})

test('getJSON returns a Task Error Object', (t) => {
  getJSON('http://localhost:3000/actions').fork(
    (err) => t.ok(err instanceof Error, 'reject clause of fork is handed an Error'),
    (response) => t.ok(typeof response === 'object', 'result clause of fork is handed an object')
  )

  getJSON('null').fork(
    (err) => t.ok(err instanceof Error, 'reject clause of fork is handed an Error'),
    (response) => t.ok(typeof response === 'object', 'result clause of fork is handed an object')
  )
  t.end()
})

test('prop works on arrays', (t) => {
  t.equal(prop(1)[1,2,3], 1, 'prop(1) of [1,2,3] is 1')
})