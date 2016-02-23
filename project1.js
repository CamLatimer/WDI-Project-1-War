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
//some players to add to game automatically for testing
var playersToAdd = ['cam', 'leah'];

//game object
var game = {
  warDeck: [],
  players: [],
  stage: [],
  buildDeck: function() {
    var self = this;
    values.forEach(function(val) {
      suits.forEach(function(suit) {
        self.warDeck.push(
          {
          value: val,
          suit: suit
          }
        );
      })
    })
    self.warDeck.forEach(function(val){
      val.worth = self.warDeck.indexOf(val);
    })
    console.log('og deck: ');
    console.log(self.warDeck)
    return self.warDeck;
  },
  shuffleDeck: function() {
    var self = this;
    self.warDeck.forEach(function(card) {
      self.warDeck.sort(function(cardOne, cardTwo) {
        if(Math.random() > 0.5) {
          return 1
        } else {
          return -1;
        }
     })
   })
   console.log('shuffled deck: ');
   console.log(self.warDeck);
   return self.warDeck;
 },
 buildPlayers: function() {
   var self = this;
   playersToAdd.forEach(function(val) {
     self.players.push({
       playerName: val,
       playerDeck: []
     });
   })
   console.log('players: ');
   console.log(self.players);
 },
 deal: function() {
   var self = this;
  //give a deck to each player
    //divides deck into arrays for each player
  var numDecks = self.players.length;
  var numCards = self.warDeck.length;
  var cardsPerDeck = numCards / numDecks;
  var playerDeckHolder = [];
  //makes a deck for each player
  for(var a = 0; a < numDecks; a++) {
    playerDeckHolder[a] = [];
  }
  //puts cards from warDeck into each deck
  playerDeckHolder.forEach(function(val) {
    for(var b = 0; b < cardsPerDeck; b++) {
      val.push(self.warDeck.pop());
    }
  })
  //give each player a deck
  for(var c = 0; c < self.players.length; c++) {
    self.players[c].playerDeck = playerDeckHolder[c];
  }
  //mark each card according to what player it's held in so you can keep track of who wins each round
  self.players.forEach(function(val) {
    val.playerDeck.forEach(function(index) {
      index.cardMark = val.playerName;
    })
  });

  //playerDecks are full
  console.log('player decks: ')
  console.log(playerDeckHolder);
  //og warkDeck is now empty
  console.log('war deck: ')
  console.log(self.warDeck);
  //check that each player has a deck
  console.log('players have decks: ')
  console.log(self.players);

 },
 fight: function() {
   var self = this;
   //function to pit cards against each other
      //put a card from each player into play area. card comes from the beginning of each players deck
  self.players.forEach(function(val) {
    //puts one card from front of each players deck
    self.stage.push(val.playerDeck.shift());
  });
    console.log('stage area: ');
    console.log(self.stage);
     //compares the cards put into the stage and returns highest card
  self.stage.sort(function(cardA, cardB) {
            return cardA.worth - cardB.worth;
          });
  //show stage sorted:
  console.log('stage sorted: ');
  console.log(self.stage);
  //round winner
  console.log('round winner: ');
  console.log(self.stage[1].cardMark);
     //the player w/ highest card gets its beginning card and the other players' beginng card pushed //to the end of his deck
 },
 proDecks: function() {
   var tempStage = this.stage;
   var self = this;
   //depending on the cardMark in the higher ranked card, choose player to add card to
   //get stage[1]'s cardMark
   var roundWinner = tempStage[1].cardMark;
   console.log(tempStage);
   //use cardMark to put both cards into the deck of the player with that cardMark
   self.players.forEach(function(val) {
     if(val.playerName == roundWinner){
       for(var i = 0; i < tempStage.length; i++){
        val.playerDeck.push(tempStage[i]);
        }
       }
     })
     self.stage = [];
     console.log('stage status:');
     console.log(self.stage);
     tempStage = [];
     console.log('temp stage status:');
     console.log(tempStage);
     console.log('player status:');
     console.log(self.players);
 },
 playAgain: function() {
   //keep game going while no players have 52 cards
    //check to see if anyone has 52 cards
  var playGame = true;
  self.players.forEach(function(val) {
    if(val.playerDeck.length < 52) {
      playGame = true;
    } else {
      return playGame = false;
    }
  })
 },
 play: function() {
   while(playGame === true) {
     this.buildDeck();
     this.shuffleDeck();
     this.buildPlayers();
     this.deal();
     this.fight();
     this.proDecks();
   }

   //if one player has 0 cards, end game
 }
}
