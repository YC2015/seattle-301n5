'use strict'

const inputString = `Lions 3, Snakes 3\nTarantulas 1, Aardvarks 0\nLions 1, Aardvarks 1\nTarantulas 3, Snakes 1\nLions 4, Grouches 0`

// TODO: turn the input string into an array of game objects that look like
// {
//   teamA: 'Lions',
//   scoreA: 3,
//   teamB: 'Grouches',
//   scoreB: 3
// }
// hint: string.split() returns an array of strings

const parseGames = function(input) {
  return input
    .split('\n')
    .map(function(game) {
      const teams = game.split(', ')
      const t1 = teams[0].split(' ')
      const t2 = teams[1].split(' ')
      return gameObj(t1[0], parseInt(t1[1]), t2[0], parseInt(t2[1]))
    })
}


}

console.log(parseGames(inputString));
