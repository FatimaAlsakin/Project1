import {WORDS} from "./words.js";
console.log(WORDS)
/*-------------------------------- Constants --------------------------------*/
const numberOfGuesses = 6
/*---------------------------- Variables (state) ----------------------------*/
let remainingGuesses 
let word
let guess
let currentRow
let currentCol
let letter 
let board
let gameOver

/*------------------------ Cached Element References ------------------------*/
const boardEl = document.querySelectorAll('.sqr')
console.log(boardEl)
const kyebardEl = document.querySelectorAll('.key')
console.log(kyebardEl)
const howToPlayEl = document.querySelector('#howToPlay')
console.log(howToPlayEl)
const messageEl = document.querySelector('#message')

/*-------------------------------- Functions --------------------------------*/
function init (){
    board= [['','','','',''],
            ['','','','',''],
            ['','','','',''],
            ['','','','',''],
            ['','','','',''],
            ['','','','','']]
    currentRow = 0
    currentCol =0   
    guess = ['','','','','']
    remainingGuesses = numberOfGuesses
    gameOver = false

    chooseWord()
    updateBoard()
}

function chooseWord (){
    word = WORDS[Math.floor(Math.random() * WORDS.length)]
    console.log(word)
}

function key (event){

    if (gameOver) return

    console.log(event.target)
    letter = event.target.id
    console.log(letter)

    if(event.target.id === 'backspace'){
        backSpace()
    }
    else if (event.target.id === 'enter'){
        enter()

    }
    else addLetter()

    updateBoard()
}

function backSpace(){
    console.log('backspace')
    if(currentCol > 0 ){
        currentCol--
        guess[currentCol] = ''
        board[currentRow][currentCol] = ''
        
    }
    console.log(guess)
    console.log(board)
    updateBoard()
    
}

function enter(){
    console.log(guess.join(''))

    if(currentCol === 5){
        if(guess.join('') === word){
            messageEl.textContent= 'You guesed the right word'
            isValidWord()
            gameOver = true
        }
        else{
            isValidWord()
            if (currentRow === 5 ){
                console.log('Game Over ')
                gameOver= true
            }
        }
    }
    else{
        messageEl.textContent ="Not A 5 letter word"
    }

}

function isValidWord(){
    if(WORDS.includes(guess.join(''))){
        messageEl.textContent= 'Not the right word'
        currentCol = 0 
        letterStatus()
        currentRow ++
    }
    else{
        messageEl.textContent = 'Not a valid word'

    }
}

function addLetter(){
    
    if (currentCol< 5 ){
       board[currentRow][currentCol] = letter
        guess[currentCol] = letter
        currentCol++
    }
}

function updateBoard (){
    board.forEach((row , rIndex) => {
        row.forEach((cell , cIndex) => {
            const index = rIndex *5 + cIndex
            boardEl[index].textContent = cell

        })
    });

}

function letterStatus (){
    let temp = word.split('')
    let statusArr = ['','','','','']
    let wordCopy = [...temp]

    for(let i=0 ; i<temp.length; i++){
        if(guess[i] === temp[i]){
            statusArr[i] = "green"
            wordCopy[i] = ''
        }
    }
    for (let i=0 ; i<temp.length; i++){
        if(wordCopy.includes(guess[i]) && statusArr[i] !== 'green'){
            statusArr[i] = 'yellow'
            wordCopy[wordCopy.indexOf(guess[i])] = ''
        }
        else if (statusArr[i] !== 'green'){
            statusArr[i] = 'grey'
        }
    }


    changeTileColor(statusArr)
    changeKeyColor(statusArr)
}

function changeTileColor (statusArr){
    console.log(statusArr)
    for(let i=0; i<guess.length; i++){
        let index = currentRow * 5 + i
        if(statusArr[i] === 'green')
            boardEl[index].classList.add('green')
        else if(statusArr[i] === 'yellow')
            boardEl[index].classList.add('yellow')
        else if(statusArr[i] === 'grey')
            boardEl[index].classList.add('grey')
    }
}

function changeKeyColor (statusArr){
    for(let i=0; i<guess.length; i++){
        let keyEl = document.getElementById(guess[i])
        if(statusArr[i] === 'green')
            keyEl.classList.add('green')
        else if(statusArr[i] === 'yellow')
            keyEl.classList.add('yellow')
        else if(statusArr[i] === 'grey')
            keyEl.classList.add('grey')
    }
}

document.addEventListener('keydown', handlePhysicalKey)

function handlePhysicalKey(event){
    if (gameOver) return

    const key = event.key.toLowerCase()

    if (key === 'backspace'){
        backSpace()
    }
    else if (key === 'enter'){
        enter()
    }
    else if (key.length === 1 && key >= 'a' && key <= 'z'){
        letter = key
        addLetter()
    }
    else {
        return // ignore shift, arrows, etc — don't call updateBoard for nothing
    }
    updateBoard()
}

const howToPlayPopup = new Popup({
    id: "my-popup",
    title: "<span style='font-weight: bold;' >How to Play</span>",
    content: `
        Guess the Wordle in 6 tries.
        Each guess must be a valid 5-letter word.
        The color of the tiles will change to show how close your guess was to the word.
        <span style='font-weight: bold;'>Examples:</span>
        <img src="./img/pic1.png">
        <span style="font-weight: bold;">W</span> is in the word and in the correct spot.
        <img src="./img/pic2.png">
        <span style="font-weight: bold;">I</span> is in the word but in the wrong spot.
        <img src="./img/pic3.png">
        <span style="font-weight: bold;">U</span> is not in the word in any spot.
        `
});
console.log(howToPlayPopup)

/*----------------------------- Event Listeners -----------------------------*/
init()

for (let one of kyebardEl){
    one.addEventListener('click', key )
}

howToPlayEl.addEventListener('click', () => {
    howToPlayPopup.show()
})