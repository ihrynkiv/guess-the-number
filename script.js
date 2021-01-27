'use strict';

let score = 10;

const againBtn = document.querySelector('.again');
const checkBtn = document.querySelector('.check');
const number = document.querySelector('.number');
const highscore = document.querySelector('.highscore');

const newSecretNumber = function (max = 100) {
    if (max <= 0) {
        max = 100;
    }
    return Math.trunc(Math.random() * max) + 1;
};

const changeTextContent = function (selector, text) {
    if (typeof selector === 'string') {
        document.querySelector(selector).textContent = text;
    } else {
        selector.textContent = text;
    }
};

const changeBgColor = function (color) {
    document.querySelector('body').style.backgroundColor = color;
};

const changeNumWidth = function (width) {
    number.style.width = width;
};

let secretNumber = newSecretNumber();

if (localStorage.getItem('highscore')) {
    changeTextContent(highscore, localStorage.getItem('highscore'));
} else {
    localStorage.setItem('highscore', 0);
}

checkBtn.addEventListener('click', () => {
    const guess = +document.querySelector('.guess').value;
    if (!guess) {
        changeTextContent('.message', '🛑 No Number');

        //When Player Win
    } else if (guess === secretNumber) {
        checkBtn.style.display = 'none';
        document.querySelector('.guess').style.display = 'none';
        againBtn.style.display = 'block';
        changeTextContent('.message', '🎉Correct Number');
        changeTextContent(number, secretNumber);
        changeNumWidth('30rem');
        changeBgColor('#60b347');

        if (score > localStorage.getItem('highscore')) {
            localStorage.setItem('highscore', score);
            changeTextContent(highscore, localStorage.getItem('highscore'));
        }

        //When guess not equal secretNumber
    } else {
        if (score > 1) {
            const messageText =
                guess < secretNumber ? '👇 Too Low!' : '👆 Too high!';
            changeTextContent('.message', messageText);
            score--;
            changeTextContent('.score', score);
        } else {
            changeTextContent('.message', '💥 You Lost the game!');
            changeTextContent('.score', 0);
        }
    }
});

againBtn.addEventListener('click', function () {
    score = 10;
    secretNumber = newSecretNumber();
    changeNumWidth('15rem');
    changeBgColor('#222');
    changeTextContent('.message', 'Start guessing...');
    changeTextContent(number, '?');
    changeTextContent('.score', score);
    document.querySelector('.guess').value = '';
    checkBtn.style.display = 'block';
    document.querySelector('.guess').style.display = 'block';
    againBtn.style.display = 'none';
});
