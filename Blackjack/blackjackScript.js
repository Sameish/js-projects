var playerName;
var playerScore = 0;
var computerScore = 0;

var cards = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];
var suits = ["Diamonds", "Spades", "Hearts", "Clubs"];
var choice;

function chooseCard() {
	choice = {cardNumber: cards[Math.floor((Math.random()*13))], cardSuit: suits[Math.floor((Math.random()*4))]}
	document.getElementById("cardSelection").innerHTML = ("Your card is the " + JSON.stringify(choice.cardNumber) + " of " + JSON.stringify(choice.cardSuit));
}

function choosePcCard() {

}


function setName() {
	playerName = $('#playerNameInput').val()
	document.getElementById("playername").classList.add('hidden');
	document.getElementById("title").innerHTML = "Let's Play BlackJack, " + playerName + "!";
	document.getElementById("gameArea").classList.remove('hidden');
}

$(function () {
	$('#playerNameButton').on('click', setName);
});

$("#playerNameInput").keyup(function(event) {
	if(event.keyCode == 13) {
		$("#playerNameButton").click();
	}
});

$(function () {
	$('#hitButton').on('click', chooseCard);
});

$(function () {
	$('#stickButton').on('click', choosePcCard);
});

// $(function () {
// 	$('#resetButton').on('click', resetGame);
// });

