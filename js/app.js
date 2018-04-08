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
  if(clicked(card)) {
    return;
  }
  displayer(card);
  opened(card);
}

function clicked(card) {
  if(card.classList.contains("show") || card.classList.contains("open")) {
    return true;
  }
  return false;
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
function isMatch(activeCards) {
  let con0 = activeCards[0].innerHTML != activeCards[1].innerHTML;
  let con1 = activeCards[0].isSameNode(activeCards[1]);
  if(con0 || con1) {
    return false;
  }
  return true;
}

function matched(activeCards) {
  for(var i = 0; i < activeCards.length; i++) {
    activeCards[i].classList.add("match");
  }
}

function notMatched(activeCards) {
  setTimeout(function(){
    for (var i = 0; i < activeCards.length; i++) {
      activeCards[i].classList.remove("open");
      activeCards[i].classList.remove("show");
    }
  },800);
}

function opened(card) {
  if(activeCards.length >0) {
    movesHandler();
    displayer(card);
    activeCards.push(card);
    if(isMatch(activeCards)) {
      matched(activeCards);
      activeCards = [];
    }else{
      notMatched(activeCards);
      activeCards = [];
    }
  }else{
    activeCards.push(card);
    movesHandler();
  }
}

cardsOpener();
