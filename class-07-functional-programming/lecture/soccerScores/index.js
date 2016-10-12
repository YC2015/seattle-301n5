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



console.log(parseGames(inputString));
