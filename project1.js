console.log('scripts up...')
//get the environment ready
window.addEventListener('load', function() {
  game.setUpGame();
});
//build deck
var values  = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
var suits   = ["club", "diamond", "heart", "spade"];
var playersToAdd = ['Computer', 'You']; //anticipated features for adding more players. may come later
var computerScoreDisplay = document.querySelector('#computer-score');
var youScoreDisplay = document.querySelector('#you-score');

//event listeners / handlers
var setUpTrig = document.querySelector('.reset-trig');//set/reset game on click
setUpTrig.addEventListener('click', function() {
  game.setUpGame();
});
var dealTrig = document.querySelector('.deal-trig');
dealTrig.addEventListener('click', function() {
  game.compareCards();
});
var displayCloser = document.querySelector('span');//toggle invisibility for display that shows winner of each round
displayCloser.addEventListener('click', function() {
  var winnerDisplay = document.querySelector('#round-popup');
  winnerDisplay.className = 'round-winner-display-invisible';
});

//game object
var game = {
  warDeck: [],
  players: [],
  stage: [],
  buildDeck: function() {
    var self = this;
    values.forEach(function(val) {
      suits.forEach(function(cardSuit) {
        self.warDeck.push(
          {
          cardName: 'img/Playing_card_' + cardSuit + '_' + val + '.svg',
          }
        );
      })
    })
    self.warDeck.forEach(function(val){
      val.worth = self.warDeck.indexOf(val);

    })
    console.log('og deck: ');
    console.log(self.warDeck)
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
   console.log('shuffled deck')
   console.log(self.warDeck);
 },
 buildPlayers: function() {
   var self = this;
   playersToAdd.forEach(function(val) {
     self.players.push({
       playerName: val,
       playerDeck: []
     });
   });
   console.log('players');
   console.log(self.players);
 },
 deal: function() {
   var self = this;
  //give a deck to each player
  //divides deck into arrays for each player and distributes cards across decks
  var numDecks = self.players.length;
  var numCards = self.warDeck.length;
  var cardsPerDeck = numCards / numDecks;
  var playerDeckHolder = [];
  //makes a deck for each player
  for(var a = 0; a < numDecks; a++) {
    playerDeckHolder[a] = [];
  }
  //puts cards from warDeck into each player's deck
  playerDeckHolder.forEach(function(val) {
    for(var b = 0; b < cardsPerDeck; b++) {
      val.push(self.warDeck.pop());
    }
  })
  //puts a deck into each player object
  for(var c = 0; c < self.players.length; c++) {
    self.players[c].playerDeck = playerDeckHolder[c];
  }
  //marks each card according to what player it's held in so you can keep track of who wins each round
  self.players.forEach(function(val) {
    val.playerDeck.forEach(function(index) {
      index.cardMark = val.playerName;
    })
  });
  //show playerDecks are full
  //show og warkDeck is now empty
  console.log('war deck: ')
  console.log(self.warDeck);
  //check that each player has a deck
  console.log('player status: ')
  console.log(self.players);

 },
 compareCards: function() {
   var self = this;
   //function to stage cards against each other in each round
      //put a card from each player into stage area. card comes from the beginning of each players deck
  self.players.forEach(function(val) {
    //puts one card from front of each players deck
    self.stage.push(val.playerDeck.shift());
  });
  //show stage area contents
    console.log('stage area: ');
    console.log(self.stage);
    //put staged cards into document body
      var cardElComputer = document.getElementById('display-card0');
      var cardElYou = document.getElementById('display-card1');
      self.stage.forEach(function(card) {
        if (card.cardMark == 'Computer') {
          cardElComputer.src = card.cardName;
          cardElComputer.alt = card.carName;
        } else if (card.cardMark == 'You') {
          cardElYou.src = card.cardName;
          cardElYou.alt = card.cardName;
        }
      })
     //compares the cards put into the stage area, puts highest card later in the array
  self.stage.sort(function(cardA, cardB) {
            return cardA.worth - cardB.worth;
          });
  //show stage sorted. highest card is last element:
  console.log('stage sorted: ');
  console.log(self.stage);
  //shows round winner which is the last element(highest rank / worth in order):
  console.log('round winner: ');
  var winMark = self.stage[1].cardMark;
  console.log(winMark);

     //the player w/ highest card gets both staged cards pushed to the end of his deck
     //then the winner of that round is shown to the user
  self.awardCards();
  var winnerDisplay = document.querySelector('#round-popup');
  winnerDisplay.className = 'round-winner-display-visible';
  var winnerName = document.querySelector('#winning-player');
  winnerName.textContent = winMark;
    //update the score displayed to user
 },
 awardCards: function() {
   var tempStage = this.stage;
   var self = this;
   //depending on the cardMark in the higher ranked card, choose player to add card to
   var roundWinner = tempStage[1].cardMark; //gets winners cardMark
   console.log(tempStage);
   //use cardMark to put both cards into the deck of the round winner
   self.players.forEach(function(val) {
     if(val.playerName == roundWinner){
       for(var i = 0; i < tempStage.length; i++){
          val.playerDeck.push(tempStage[i]);
        }
       }
     })
   //show score in display with a display meter made from divs on game init
   if(roundWinner == 'Computer') {
     var compScoreUnit = document.createElement('div');
     compScoreUnit.className = 'score-meter'
     computerScoreDisplay.appendChild(compScoreUnit);
      var youScoreMeter = youScoreDisplay.childNodes.length;
      youScoreDisplay.removeChild(youScoreDisplay.childNodes[youScoreMeter - 1]);
   } else if (roundWinner == 'You') {
     var youScoreUnit = document.createElement('div');
     youScoreUnit.className = 'score-meter';
     youScoreDisplay.appendChild(youScoreUnit);
     var computerScoreMeter = computerScoreDisplay.childNodes.length;
     computerScoreDisplay.removeChild(computerScoreDisplay.childNodes[computerScoreMeter -1]);
   }
    //clear stage for next round
     self.stage = [];
     console.log('stage status:');
     console.log(self.stage);
     tempStage = [];
     console.log('temp stage status:');
     console.log(tempStage);
     console.log('player status:');
     console.log(self.players);
     //display size of deck / score to user
     self.players.forEach(function(player) {
       if(player.playerDeck.length < 52) {
         if (player.playerName == 'Computer') {
           console.log('cards in the deck for computer:')
           console.log(player.playerDeck.length);
         } else if (player.playerName == 'You') {
           console.log('cards in the deck for you:')
           console.log(player.playerDeck.length);
         }
       } else {
         alert(player.playerName + ' wins!');
         console.log(player.playerName + ' wins!');
       }
     })
 },
  play: function() {
     game.buildDeck();
     game.shuffleDeck();
     game.buildPlayers();
     game.deal();
     //game.compareCards();
     //game.awardCards();
     //game.playAgain();
 },
 setUpGame: function() {
   var cardElComputer = document.getElementById('display-card0');
   var cardElYou = document.getElementById('display-card1');
   var computerScoreDisplay = document.querySelector('#computer-score');
   var youScoreDisplay = document.querySelector('#you-score');
   cardElComputer.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Laptop_font_awesome.svg/200px-Laptop_font_awesome.svg.png";
   cardElComputer.alt = 'laptop';
   cardElYou.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/718smiley.svg/200px-718smiley.svg.png"
   cardElYou.alt = "smiley"
   game.warDeck = [],
   game.players = [],
   game.stage = [],
   game.buildDeck();
   game.shuffleDeck();
   game.buildPlayers();
   game.deal();
   //initialize display meters for scorekeeping
     game.players[0].playerDeck.forEach(function(card) {
       var compScoreUnit = document.createElement('div');
       compScoreUnit.className = 'score-meter';
       computerScoreDisplay.appendChild(compScoreUnit);
     })
     game.players[1].playerDeck.forEach(function(card) {
       var youScoreUnit = document.createElement('div');
       youScoreUnit.className = 'score-meter';
       youScoreDisplay.appendChild(youScoreUnit);
     })
 }
}
/*
psuedo:
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
