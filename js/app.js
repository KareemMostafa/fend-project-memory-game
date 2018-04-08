let cards        = document.querySelectorAll(".card");
let holdCards    = [...cards];
let deck         = document.querySelector(".deck");
let activeCards  = [];
let movesCounter = 0;
let ratingStars  = 0;
let clicks       = 0;

//Shuffle cards
function cardsShuffler() {
shuffle(holdCards);
holdCards.forEach(function(elem) {
    deck.append(elem);
});
}

//Open cards when it's called and functions are applied to them
function cardsOpener() {
  for (var i = 0; i < cards.length ; i += 1) {
    cards[i].onclick = function () {
      matcher(this);
    }
  }
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function matcher(card) {
  displayer(card);
  opened(card);
}

function displayer(card) {
  card.classList.add("open");
  card.classList.add("show");
}

function movesHandler() {
  movesCounter ++;
  if(movesCounter === 1) {
    document.querySelector(".checker").innerHTML = "Move";
    document.querySelector(".moves").innerHTML  = movesCounter;
  }else{
    document.querySelector(".moves").innerHTML  = movesCounter;
    document.querySelector(".checker").innerHTML = "Moves";
  }
}

function matched(activeCards) {
  for(var i = 0; i < activeCards.length; i++) {
    activeCards[i].classList.add("match");
  }
}

function notMatched(activeCards) {
  for (var i = 0; i < activeCards.length; i++) {
    activeCards[i].classList.remove("open");
    activeCards[i].classList.remove("show");
  }
}

function opened(card) {
  if(activeCards.length >0) {
    movesHandler();
    displayer(card);
    activeCards.push(card);
    if(isMatch(activeCards)) {
      matched(activeCards);
    }else{
      notMatched(activeCards);
    }
  }else{
    activeCards.push(card);
    movesHandler();
  }
}

cardsOpener();
