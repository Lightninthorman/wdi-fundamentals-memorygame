var cards = [
	{
		rank: "Queen",
		suit: "Hearts",
		cardImage: "images/queen-of-hearts.png"
	},
	{
		rank: "Queen",
		suit: "Diamonds",
		cardImage: "images/queen-of-diamonds.png"
	},
	{
		rank: "King",
		suit: "Hearts",
		cardImage: "images/king-of-hearts.png"
	},
	{
		rank: "King",
		suit: "Diamonds",
		cardImage: "images/king-of-diamonds.png"
	}
];
var cardsInPlay = [];


var score = {
		wins: 0,
		loss: 0,
	};



function checkForMatch(){
	if (cardsInPlay.length === 2){
		if (cardsInPlay[0] === cardsInPlay[1]){
			alert("You found a match!");
			keepScore(1,0);
			setTimeout(reset, 1000);
		}else{
			alert("Sorry, try again.");
			keepScore(0,1);
			setTimeout(reset, 1000);
		};
			};
	};

function flipCard(){
	var cardId = this.getAttribute('data-id');

	cardsInPlay.push(cards[cardId].rank);

	this.setAttribute('src', cards[cardId].cardImage);
	checkForMatch();

}


var createBoard = function(){
	for (var i = 0; i < cards.length; i++){
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src', 'images/back.png');
		cardElement.setAttribute('data-id', i);
		cardElement.addEventListener('click', flipCard);
		document.getElementById('game-board').appendChild(cardElement);

	}
}

var reset = function(){
	var parent = document.getElementById('game-board');
	var child = parent.lastElementChild;
	
	while(child){
		parent.removeChild(child);
		child = parent.lastElementChild;
	}
	createBoard();

	var numberCardsPlayed = cardsInPlay.length;
	while (numberCardsPlayed > 0){
		cardsInPlay.pop();
		numberCardsPlayed = cardsInPlay.length;		
	};
};

var scoreReset = function(){
	score.wins = 0;
	score.loss = 0;
	keepScore(0,0);
};

var resetButton = function(){
	var resetBtn = document.getElementsByClassName("reset")[0];
	resetBtn.addEventListener('click', reset);
	resetBtn.addEventListener('click', scoreReset);
};



var keepScore = function(x,y){
	var gamesWon = document.getElementsByClassName('scoreboard')[0];
	var gamesLost = document.getElementsByClassName('scoreboard')[1];

	score.wins = score.wins + x;
	score.loss = score.loss + y;
	gamesWon.innerHTML = '<p>Won</p><p>'+ score.wins +'</p>';
	gamesLost.innerHTML = '<p>Lost</p><p>'+ score.loss +'</p>';


}
createBoard();
resetButton();
keepScore(0,0);