# WDI-Project-1-War

This is code for a game of War, though it doesn't include functionality to allow
the user to play the same way one would play the original IRL.  It doesn't
implement the same tie-breaker rules that the original has.  Instead, each card
has it's own rank.  A 3 of spades is worth more than a 3 of clubs.  

###Technologies and Approach:
Javascript is the main tech driving the game.  I made objects and arrays
to represent cards, decks, and players that the user, via what's presented by
HTML and CSS, manipulates by clicking in the browser. Actions that a user would
take in the game IRL are executed by methods included in an object that represents
the entire game.

My approach was to build the game object, build the UI for
the game, then connect the UI HTML elements and CSS styles to the javascript with
event listeners.

###User Stories:
*-Users should be able to see buttons/links clearly marked in order to play
intuitively and mimic the simplicity of the IRL game*
*-So the game can start right away, onload, there should be spaces and a split
deck for two players already loaded.*
*-users should be able to see who's winning the game and be shown who the eventual
winner is so they can keep track of how the game is going*
*-Users should have a reset button in case they want to restart the game.*

###Installation:
1. Clone, fork or download the .zip folder
2. Open the folder and open index.html in the browser of your choice

###Unsolved Problems:
#####How to decrease the length of players' score meter after each round...
I can increase it just fine. Deleting HTML elements after each round is another
thing.How to break ties in the way players do in the IRL game.  I ran out of time
before I could work on that feature.  So, I just made every card have a rank.  
In this game there are no ties since no two cards have the same rank.
