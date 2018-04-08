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
  document.querySelector(".moves").innerHTML = movesCounter;
}

function opened(card) {
  if(activeCards.length >0) {
    movesHandler();
    displayer(card);
    activeCards.push(card);
    if(isMatch(activeCards)) {
      matched();
    }else{
      notMatched();
    }
  }else{
    activeCards.push(card);
    movesHandler();
  }
}

cardsOpener();
