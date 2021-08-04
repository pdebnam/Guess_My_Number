'use strict';

/*
// Selecting an HTML element in JavaScript
console.log(document.querySelector('.message').textContent);
*/

const btnCheck = document.querySelector('.check');
const btnAgain = document.querySelector('.again');

let secretNumber, score, playing;
let highScore = 0;

function init() {
  // 1. Initialize secret number between 1 and 20 (inclusive)
  // 2. Set initial score to 20
  secretNumber = getRandomNumber();
  score = 20;
  playing = true;

  // Reset message
  displayMessage('Start guessing...');

  // Reset number
  displayNumber('?');
  // Reset score
  displayScore(score);
  // Reset input box
  changeInput('');

  // Reset the background and width of number
  changeBackgroundColor('#222');
  changeNumberWidth('15rem');
}

function getRandomNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}

function displayNumber(number) {
  document.querySelector('.number').textContent = number;
}

function displayScore(score) {
  document.querySelector('.score').textContent = score;
}

function displayHighScore(highScore) {
  document.querySelector('.highscore').textContent = highScore;
}
function changeBackgroundColor(color) {
  document.querySelector('body').style.backgroundColor = color;
}

function changeNumberWidth(width) {
  document.querySelector('.number').style.width = width;
}

function changeInput(value) {
  document.querySelector('.guess').value = value;
}

// Play game
function playGame() {
  if (playing) {
    const guess = Number(document.querySelector('.guess').value);

    // When there is no input
    if (!guess) {
      displayMessage('⛔ No number entered!');
    } else if (guess < 1 || guess > 20) {
      displayMessage('Number must between 1 and 20 (inclusive).');
    }

    // When players wins
    else if (guess === secretNumber) {
      playing = false;
      displayMessage('🎉 Correct number!');
      displayNumber(secretNumber);
      // change background color
      changeBackgroundColor('#60b347');
      // increase width of the secret number
      changeNumberWidth('30rem');

      // Set new high score if necessary
      if (score > highScore) {
        highScore = score;
        displayHighScore(highScore);
      }
    }

    // When the guess is wrong
    else if (guess !== secretNumber) {
      displayMessage(
        guess > secretNumber ? '👎🏿📈 Guess too high!' : '👎🏿📉 Guess too low!'
      );
      score--;
      displayScore(score);
      if (score === 0) {
        playing = false;
        displayMessage('Loser!');
      }
    }
  }
}
// Start game
init();

// Play game by either clicking button or pressing Enter key
btnCheck.addEventListener('click', playGame);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') playGame();
});

// New game functionality
// Reset the game back to the initial state
btnAgain.addEventListener('click', init);
