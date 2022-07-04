"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const GAMEBOARD = document.querySelector('#game');
const DISPLAYSCORE = document.querySelector('#score');

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple", "pink",
  "red", "blue", "green", "orange", "purple", "pink"
];
const COUNT = {
  flips: 0,
  cardsFlipped: [],
  score: 0,
  match: 0,
  maxMatch: COLORS.length / 2
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
  for (let color of colors) {
    const card = document.createElement('div');
    card.className = `${color}`;
    GAMEBOARD.append(card);
  }
  let cards = GAMEBOARD.childNodes;
  for (let i = 0; i < cards.length; i++) {
    cards[i].id = `${i + 1}`;
  }
}

const CARDS = GAMEBOARD.childNodes;

function addListener() {
  document.addEventListener('click', e => {
    const eTarget = e.target;
    const eParent = eTarget.parentElement;

    if (eParent === GAMEBOARD && COUNT.flips < 2 && eTarget.className !== 'match' && COUNT.cardsFlipped[0] !== eTarget.id) {
      COUNT.score++;
      DISPLAYSCORE.innerText = COUNT.score;
      flipCard(eTarget);
    }
  });
}

addListener();

/** Flip a card face-up. */

function flipCard(card) {
  let flipped = COUNT.flips;
  let cardsFlipped = COUNT.cardsFlipped;
  let id = card.id;
  let newColor = card.className;
  if (flipped === 0) {
    card.style.backgroundColor = newColor;
    COUNT.flips++;
    cardsFlipped.push(id);
  } else if (flipped === 1) {
    card.style.backgroundColor = newColor;
    COUNT.flips++;
    cardsFlipped.push(id);
    isMatch();
  }
}

/** Flip a card face-down. */

function unFlipCard(GAMEBOARD) {
  // ... you need to write this ...
  let cards = GAMEBOARD.childNodes;
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    if (card.className !== 'match') {
      card.style.backgroundColor = '';
    }
  }

}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
}

function isMatch() {
  let cardsFlipped = COUNT.cardsFlipped;

  if (document.getElementById(`${cardsFlipped[0]}`).className === document.getElementById(`${cardsFlipped[1]}`).className && cardsFlipped[0] !== cardsFlipped[1]) {
    document.getElementById(`${cardsFlipped[0]}`).className = 'match';
    document.getElementById(`${cardsFlipped[1]}`).className = 'match';
    COUNT.cardsFlipped = [];
    COUNT.match++;
    isWin();
    setTimeout(() => {
      COUNT.flips = 0;
    }, 500);
  } else {
    COUNT.cardsFlipped = [];
    setTimeout(() => {
      unFlipCard(GAMEBOARD);
    }, FOUND_MATCH_WAIT_MSECS);
    setTimeout(() => {
      COUNT.flips = 0;
    }, FOUND_MATCH_WAIT_MSECS);
  }
}

function isWin() {
  if (COUNT.match === COUNT.maxMatch) {
    COUNT.finalScore = COUNT.score + 1;
    setTimeout(() => {
      GAMEBOARD.innerHTML =
      `<section id="win" class="container">
      <section class="row">
        <section class="col text-center">
          <h3>You Win!</h3>
        </section>
      </section>
      <section class="row">
        <section class="col text-center">
          <h3>Your Score: ${COUNT.score + 1}</h3>
        </section>
      </section>
    </section>`;
    highScore();
    }, 1000);
  }
}


function restart() {
  while (GAMEBOARD.firstChild) {
    GAMEBOARD.removeChild(GAMEBOARD.firstChild);
  }
  const newShuffle = shuffle(COLORS);
  createCards(newShuffle);
  COUNT.flips = 0;
  COUNT.cardsFlipped = [];
  COUNT.score = 0;
  COUNT.match = 0;
  COUNT.finalScore = 0;
  DISPLAYSCORE.innerText = 0;
}

const RESTART = document.getElementById('restart');
RESTART.addEventListener('click', function (e) {
  e.preventDefault();
  restart();
});

function highScore() {
  const highScore = document.getElementById('highScore');
  if (highScore.innerText === 'None Yet!') {
    highScore.innerText = COUNT.finalScore;
  } else if (COUNT.finalScore < highScore.innerText) {
    highScore.innerText = COUNT.finalScore;
  }
}

