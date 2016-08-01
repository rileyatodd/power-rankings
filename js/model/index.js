import { reduce, compose, merge, map, curry, propOr, set, maxBy, minBy, flip, lensPath, over, add } from 'ramda'

const winLoseReducer = (acc, x) => ({
  winner: maxBy(propOr(-Infinity, 'score'), x, acc.winner),
  loser: minBy(propOr(Infinity, 'score'), x, acc.loser)
})

// Player p :: [p] -> {winner: p, loser: p}
export const findWinnerAndLoser = reduce(winLoseReducer, {
  winner: {},
  loser: {}
})

// Player a :: a -> a -> a -> a
export const updateRank = curry((winner, loser, player) =>
  winner.rank <= loser.rank ?
    player :
  player.id == winner.id ?
    merge(player, {rank: loser.rank}) :
  player.rank < winner.rank && player.rank >= loser.rank ?
    merge(player, {rank: player.rank + 1}) :

    player
)

export const updateRecord = curry((winner, loser, player) =>
  winner.id == loser.id ?
    player :
  player.id == winner.id ?
    over(lensPath(['record', 'wins']), add(1), player) :
  player.id == loser.id ?
    over(lensPath(['record', 'losses']), add(1), player) :

    player
)

export const winner = {
  id: 1,
  rank: 2,
  record: {
    wins: 3,
    losses: 2
  }
}

export const loser = {
  id: 2,
  rank: 1,
  record: {
    wins: 2,
    losses: 3
  }
}
