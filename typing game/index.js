import randomWord from './src/randomWords.mjs';
import { easy, medium, hard } from './src/level.mjs';

const levelElem = document.getElementById('level'),
    manualBoard = document.getElementById('manual-board'),
    numWords = document.getElementById('wordsNum'),
    secondsM = document.getElementById('seconds-inp'),
    minM = document.getElementById('min-inp'),
    maxM = document.getElementById('max-inp'),
    ok = document.querySelector('.ok'),
    mainInput = document.querySelector('.mainInput'),
    word = document.querySelector('.word'),
    timeLeft = document.querySelector('.timeLeft'),
    score = document.querySelector('.score'),
    massage = document.querySelector('.massage'),
    restartBtn = document.querySelector('.restart-btn');

let lvl = easy,
    manual = false,
    gameState = true,
    manualObj,
    intevalE,
    timeOut;

function constructor(wordsNum, minM, maxM, seconds) {
    manualObj = {
        numberOfWords: wordsNum,
        minLength: minM,
        maxLength: maxM,
        seconds,
    }
}

function levelDefiner(level) {
    textSetter(level);
    changeHandler(level);
    lvl = level;
}

levelElem.addEventListener('change', () => {

    tinyHandlers()
    manualBoard.style.display = 'none';

    if (levelElem.value === 'easy') {
        levelDefiner(easy)
    };
    if (levelElem.value === 'medium') {
        levelDefiner(medium)
    };
    if (levelElem.value === 'hard') {
        levelDefiner(hard)
    };
    if (levelElem.value === 'manual') {
        manualBoard.style.display = 'block';
        secondsM.focus();
    }
    if (levelElem.value !== 'manual') {

        intevalFunc(lvl.seconds);
        time(lvl);
    }
});

ok.addEventListener('click', () => {

    tinyHandlers()
    constructor(numWords.value, minM.value, maxM.value, secondsM.value)
    word.innerHTML = randomWord(manualObj)
    lvl = manualObj;
    intevalFunc(manualObj.seconds)
    time(lvl)

})

restartBtn.addEventListener('click', () => {

    tinyHandlers()
    word.innerHTML = randomWord()
    intevalFunc(lvl.seconds)
    time(lvl)

});

window.addEventListener('load', () => {

    word.innerHTML = randomWord(easy)
    intevalFunc(lvl.seconds)
    time(lvl)

})

mainInput.addEventListener('input', changeHandler)

function changeHandler(obj = manualObj) {


    if (mainInput.value === word.innerHTML && gameState === true) {
        clearTime()
        clearInt()
        mainInput.value = '';
        word.innerHTML = randomWord(obj);
        scoreIncrement();
        intevalFunc(lvl.seconds)
        time(lvl)

    }
}

function textSetter(obj) {
    word.innerHTML = randomWord(obj)
}

function scoreIncrement() {
    score.innerHTML = parseInt(score.innerHTML) + 1;
}



function intevalFunc(countDown) {

    intevalE = setInterval(() => {
        timeLeft.innerHTML = countDown;
        countDown--;
    }, 1000)

}

function time(obj) {

    timeOut = setTimeout(() => {
        massage.innerHTML = 'Game is over!!!';
        gameState = false;
        clearInt();
    }, `${parseInt(obj.seconds) + 1}000`);

}

function clearInt() {
    clearInterval(intevalE)
}

function clearTime() {
    clearTimeout(timeOut)
}

function tinyHandlers() {
    clearTime()
    clearInt()
    gameState = true;
    massage.innerHTML = '';
    mainInput.value = '';
    mainInput.focus()
    score.innerHTML = 0;
}