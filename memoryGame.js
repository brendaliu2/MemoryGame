"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const displayScore = document.querySelector('#score');

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];
const COUNT = {
  flips:0,
  cardsFlipped:[],
  score:0,
  match:0,
  maxMatch: COLORS.length/2
};
const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    // missing code here ...
    const card = document.createElement('div');
    card.className = `${color}`;
    gameBoard.append(card);
    card.addEventListener('click',function(e){
      e.preventDefault();
      flipCard(card);
      COUNT.score++;
      displayScore.innerText = COUNT.score;
    })
  }
  let cards = gameBoard.childNodes;
  for (let i = 0; i < cards.length; i++){
    cards[i].id = `${i+1}`;
  }

}


/** Flip a card face-up. */

function flipCard(card) {
  // ... you need to write this ...
  let flipped = COUNT.flips;
  let cardsFlipped = COUNT.cardsFlipped;
  let id = card.id;
  const gameBoard = document.getElementById("game");
  let newColor = card.className;
  if(flipped === 0){
    card.style.backgroundColor = newColor;
    COUNT.flips++;
    cardsFlipped.push(id);
  } else if (flipped === 1){
    card.style.backgroundColor = newColor;
    cardsFlipped.push(id);
    if(document.getElementById(`${cardsFlipped[0]}`).className === document.getElementById(`${cardsFlipped[1]}`).className){
      document.getElementById(`${cardsFlipped[0]}`).className = 'match';
      document.getElementById(`${cardsFlipped[1]}`).className = 'match';
      COUNT.flips = 0;
      COUNT.cardsFlipped = [];
      COUNT.match++;
      if(COUNT.match === COUNT.maxMatch){
        setTimeout(() => {
          alert('You Win!');
        },500)
      }
    } else {
      COUNT.flips = 0;
      COUNT.cardsFlipped = [];
      setTimeout(() => {
        unFlipCard(gameBoard);
      }, 1000);
    }
  }



  // if(flipped < 2){
  //   let newColor = card.className;
  //   count.cardsFlipped = [newColor];
  //   card.style.backgroundColor = newColor;
  //   count.flippedCards++;
  // } else {
  //   unFlipCard(gameBoard);
  //   count.flippedCards = 0;
  // }


}

/** Flip a card face-down. */

function unFlipCard(gameBoard) {
  // ... you need to write this ...
  let cards = gameBoard.childNodes;
  for (let i = 0; i < cards.length; i++){
    let card = cards[i];
    if(card.className !== 'match'){
      card.style.backgroundColor = '';
    }
  }

}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  // ... you need to write this ...
}

function restart(){
  const gameBoard = document.getElementById("game");
  let cards = gameBoard.childNodes;
  for (let card of cards){
    card.remove();
  }
  const newShuffle = shuffle(COLORS);
  createCards(newShuffle);
}

const RESTART = document.getElementById('restart');


