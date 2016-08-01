import Task from 'data.task'
import { add, max, apply, prop, map, identity, chain, compose, curry, flip } from 'ramda'

export const trace = curry((tag, x) => {
  console.log(tag, x)
  return x
})

// Promise a -> Task Error a
export const taskFromPromise = promise => new Task((reject, result) => promise.then(result).catch(reject))

// String -> Object -> Task Error Response
export const request = curry((url, params) => taskFromPromise(fetch(url, params)))

// URL -> Object -> Task Error Response
export const postJSON = (url, data) => request(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})

export const throwErr = (err) => {throw err;}

// Response -> Task Error Object
const getResponseJSON = (response) => taskFromPromise(response.json())

// URL -> Task Error Object
export const getJSON = compose(chain(getResponseJSON), flip(request)({method: 'GET'}))

export const mapped = curry(
  (f, x) => identity( map( compose( x=>x.value, f), x) )
);

// Integer a :: a -> b -> Bool
export const hasId = curry((id, x) => id === x.id)

// This is naive because it doesn't worry about collisions in the persistence layer
// Int b :: [a] -> b
export const getNextId = compose(add(1), max(0), apply(Math.max), map(prop('id')))
