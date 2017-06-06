var playerName;
var playerScore = 0;
var dealerScore = 0;
var cards = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];
var suits = ["Diamonds", "Spades", "Hearts", "Clubs"];
var startCard1;
var startCard2;
var deck = [];
var newDeck;
var dealtCard;
var playerHand = [];
var dealerHand = [];

function logObject(obj) {
	console.log(JSON.stringify(obj, null, 2));
}

//these two bits build up the deck of 52 cards, in order. Only done once per page refresh
suits.forEach(buildDeck);
function buildDeck(suit) {
	for (i = 0; i < 13; i++) {
		var a = {number: i, suit: suit};
		deck.push(a);
	}
}

//this function shuffles the nice ordered deck, into a shuffled up deck, for use in the game. New games will regenerate this, until page refresh
function newGame() {
	newDeck = deck.slice();
	shuffle(newDeck);

	function shuffle(array) {
		for (var i = array.length - 1; i > 0; i--) {
	    	var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	    return array;
	}
	playerHand.length = 0;
	dealerHand.length = 0; 
	playerScore = 0;
	dealerScore = 0;
}

//this calculates the score of each of the cards, accounting for ace being 1 or 0 (but not dynamically, only on generation)
function calculateScore(card, score) {
	if (card.number >=1 && card.number < 10) {
		cardValue = card.number + 1;

	} else if (card.number >= 10 && card.number < 13) {
		cardValue = 10;

	} else if (card.number == 0 && score <= 10) {
		cardValue = 11;

	} else if (card.number == 0 && score > 10) { //need to add here concept of ace changing value if it helps the score
		cardValue = 1;
	}
	score += cardValue;
	return score;
}

//this function just updates the score text displayed in the ui
function updateScore() {
	document.getElementById("score-area").innerHTML = ("Your score is currently: " + playerScore + '<br />' + "The dealer's score is currently: " + dealerScore);
}

//this function draws a new card, prints it to the user, and calculates the users new score
function chooseCard() {
	dealtCard = newDeck.pop();
	playerHand.push(dealtCard);
	document.getElementById("card-selection").innerHTML = ("You draw the " + cards[dealtCard.number] + " of " + dealtCard.suit);
	playerScore = calculateScore(dealtCard, playerScore);
	updateScore();

	if (playerScore > 21) { //if the new card causes the player to bust, this happens. Need to add a bust/game over/victory function
		alert("You went bust! Unlucky!");
	}
}


function dealerTurn() {
	document.getElementById("game-buttons").classList.add('hidden');
	chooseDealerCard();
//this is the function for the dealer card drawing. Need to add logic as to when the dealer will auto hit and auto stick. 
//I guess this should all be in a loop and only called when the stick button is pressed, with all the logic for win/lose too.
//need to add the "first cards" bit in here, at the moment, dealer only starts with 1 card and then ends.
	function chooseDealerCard() {
		dealtCard = newDeck.pop();
		dealerHand.push(dealtCard);
		document.getElementById("card-selection").innerHTML = ("The dealer's card is the " + cards[dealtCard.number] + " of " + dealtCard.suit);
		dealerScore = calculateScore(dealtCard, dealerScore);
		updateScore();
	}
}


//this function draws the first 2 cards of the game for the player, prints it to the ui, calculates the score and if blackjack, you win. 
//Need to add the bust/game over/victory function.
//need to either make this generic so it also handles the dealer's first cards, or create a new function for the dealer's first cards (or edit chooseDealerCard)
function firstCards() {
	startCard1 = newDeck.pop();
	startCard2 = newDeck.pop();
	playerHand.push(startCard1, startCard2);
	document.getElementById("card-selection").innerHTML = ("Your cards are the " + cards[startCard1.number] + " of " + startCard1.suit
								+ " and the " + cards[startCard2.number] + " of " + startCard2.suit);
	playerScore = calculateScore(startCard1, playerScore);
	playerScore = calculateScore(startCard2, playerScore);
	updateScore();
	if (playerScore == 21) {
		alert("BlackJack! You win!");
	}
}

//this is just a bit of fancy fun to put the player's name in the game. It also acts as a start to the game
function setName() {
	playerName = $('#playerNameInput').val()
	document.getElementById("player-name").classList.add('hidden');
	document.getElementById("title").innerHTML = "Let's Play BlackJack, " + playerName + "!";
	newGame();
	document.getElementById("game-area").classList.remove('hidden');
	firstCards();
}

//clicking the set name button starts the game
$(function () {
	$('#playerNameButton').on('click', setName);
});

//this is just so you can press the enter key instead of clicking the start button
$("#playerNameInput").keyup(function(event) {
	if(event.keyCode == 13) {
		$("#playerNameButton").click();
	}
});

//activates the hit button
$(function () {
	$('#hitButton').on('click', chooseCard);
});

$(function () {
	$('#stickButton').on('click', dealerTurn);
});

// $(function () {
// 	$('#resetButton').on('click', resetGame);
// });
