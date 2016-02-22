console.log('scripts up...')
/*
game object that contains
a deck
  deck is an array of card objects
  card object properties
    cardName
    cardWorth
function to shuffle the deck
function to build players
  each player is an object
  player object properties
    playerName
    playerDeck
      array of cards made from game.deck
function to deal cards to players
  divides deck into arrays for each player
  assigns each new deck to a player's player.playerDeck property
function to playCard
  compares the cards at the beginning of each players' deck
  the player w/ highest card gets its beginning card and the other players' beginng card pushed to the end of his deck
function to start or end game
function to play()
  while both players have more than 0 cards
  if one player has 0 cards, end game
*/

//build deck
var values  = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
var suits   = ["Clubs", "Diamonds", "Hearts", "Spades"];
values.forEach(function(val) {
  suits.forEach(function(suit) {
    game.warDeck.push(
      value: val;
      suit: suit;
      worth: values.indexOf(value);
    );
  })
})
//game object
var game = {
  warDeck: = [];
}
