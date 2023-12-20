const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModel = document.querySelector(".game-model");
const playAgainBtn = document.querySelector(".play-again");
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;
const resetGame = () => {
    // reset all game variables and ui elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = 'hangman-' + wrongGuessCount + '.svg';
    guessesText.innerText = wrongGuessCount + "/" + maxGuesses;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => '<li class="letter"></li>').join("");
    gameModel.classList.remove("show");
}
const getRandomWord = () => {
    // generate random word and hint from wordlist
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    // console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}
const gameOver = (isVictory) => {
    // after 300ms of game complete show model
    setTimeout(() => {
        const modelText = isVictory ? 'You found the word: ' : 'The correct word was: ';
        gameModel.querySelector("img").src = `${isVictory ? 'victory' : 'lost'}.gif`;
        gameModel.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameModel.querySelector("p").innerHTML = `${modelText} <b>${currentWord}</b>`;
        gameModel.classList.add("show");
    }, 300);
}
// const gameOver = (isVictory) =>{
//     if(isVictory){
//         setTimeout(()=>{
//             const modelText = 'You found the word: ';
//             gameModel.querySelector("img").src = 'victory.gif';
//             gameModel.querySelector("h4").innerText = 'Congrats!';
//             gameModel.querySelector("p").innerHTML = modelText+<b>currentWord</b>;
//             gameModel.classList.add("show");
//         },300);
//     }
//     else{
//         setTimeout(()=>{
//             const modelText = 'The correct word was: ';
//             gameModel.querySelector("p").innerHTML = modelText+<b>currentWord</b>;
//             gameModel.classList.add("show");
//         },300);
//     }
// }
const initGame = (button, clickedLetter) => {
    // console.log(button,clickedLetter);
    // checking if clickedletter is exist on the currentword
    if (currentWord.includes(clickedLetter)) {
        // console.log(clickedLetter,"is exist on the word");
        //showing all the correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    }
    else {
        //console.log(clickedLetter, "is not exist on the word");
        // if clicked letter doesn't exist then update wrongguesses and hangman image
        wrongGuessCount++;
        hangmanImage.src = 'hangman-' + wrongGuessCount + '.svg';
    }
    button.disabled = true;
    guessesText.innerText = wrongGuessCount + "/" + maxGuesses;
    // call gameover function in case any of two is true
    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
}
//create keyboard
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerHTML = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)))
}
getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);