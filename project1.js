console.log('scripts up...')
window.addEventListener('load', function() {
  game.setUpGame();
});
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

//build deck
var values  = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
var suits   = ["club", "diamond", "heart", "spade"];
//some players to add to game automatically for testing
var playersToAdd = ['Computer', 'You'];
var computerScoreDisplay = document.querySelector('#computer-score');
var youScoreDisplay = document.querySelector('#you-score');

//event listeners / handlers
//set/reset game on click
var setUpTrig = document.querySelector('.reset-trig');
setUpTrig.addEventListener('click', function() {
  game.setUpGame();
});
var dealTrig = document.querySelector('.deal-trig');
dealTrig.addEventListener('click', function() {
  game.compareCards();
});
//toggle invisibility for display that shows winner of each round
var displayCloser = document.querySelector('span');
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
  //make card img elements for each playerDecks and put them on page
  /*self.players.forEach(function(val) {
    val.playerDeck.forEach(function(card) {
      var cardEl = document.createElement('img');
      cardEl.src = card.cardName;
      var mover = document.getElementById('mover-deck' + card);
      mover.appendChild(cardEl);
    })
  })*/

  //playerDecks are full
  //og warkDeck is now empty
  console.log('war deck: ')
  console.log(self.warDeck);
  //check that each player has a deck
  console.log('player status: ')
  console.log(self.players);

 },
 compareCards: function() {
   var self = this;
   //function to pit cards against each other
      //put a card from each player into play area. card comes from the beginning of each players deck
  self.players.forEach(function(val) {
    //puts one card from front of each players deck
    self.stage.push(val.playerDeck.shift());
  });
    console.log('stage area: ');
    console.log(self.stage);
    //put in-play cards into document body

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

      console.log(self.stage[0].cardName);


     //compares the cards put into the stage and returns highest card
  self.stage.sort(function(cardA, cardB) {
            return cardA.worth - cardB.worth;
          });
  //show stage sorted:
  console.log('stage sorted: ');
  console.log(self.stage);
  //round winner
  console.log('round winner: ');
  var winMark = self.stage[1].cardMark;
  console.log(winMark);

     //the player w/ highest card gets its beginning card and the other players' beginng card pushedto the end of his deck
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
     //display size of deck / score to user
     self.players.forEach(function(player) {
       if(player.playerDeck.length < 52) {
         if (player.playerName == 'Computer') {
             var scoreUnit = document.createElement('div');
             scoreUnit.className = 'score-meter';
             computerScoreDisplay.appendChild(scoreUnit);
           console.log(player.playerDeck.length);
         } else if (player.playerName == 'You') {
           youScoreDisplay.textContent = player.playerDeck.length;
           console.log(player.playerDeck.length);
         }
       } else {
         console.log(player.playerName + ' wins!');
       }
     })
 },
 /*playAgain: function() {
   var self = this;
   //keep game going while no players have 52 cards
    //check to see if anyone has 52 cards
  self.players.forEach(function(val) {
    if(val.playerDeck.length < 52) {
      //if no one has 52 cards yet, start a new round
      var go = prompt('ready?(y/n)');
      if(go = 'y'){
        self.play();
      }
    } else if(val.playerDeck.length === 52) {
      //if a player has 52 cards...
      return console.log(val.playerName + ' wins!\n' + 'play again? (y/n)');
    }
  })
},
  */play: function() {
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
   //computerScoreDisplay.textContent = 26;
   //ouScoreDisplay.textContent = 26;
   var scoreUnit = document.createElement('div');
   scoreUnit.className = 'score-meter';
   computerScoreDisplay.appendChild(scoreUnit);
 }
}
