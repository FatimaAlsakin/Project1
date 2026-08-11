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
        guess[currentCol] = ''
        board[currentRow][currentCol] = ''
        currentCol--
    }
    console.log(guess)
    console.log(board)
    updateBoard()
    
}

function enter(){
    console.log(guess.join(''))

    if(currentCol === 5){
        if(guess.join('') === word){
            alert('You guesed the right word')
            gameOver = true
        }
        else{
            console.log('Not the right word')
            if(currentRow < 5){
                currentCol = 0 
                currentRow ++
                console.log(currentRow)
            }
            else if (currentRow === 5 ){
                console.log('Game Over ')
                gameOver= true
            }
        }
    }
    else{
        alert("Not A 5 letter word")
    }
}

function addLetter(){
    
    if (currentCol< 5 ){
       board[currentRow][currentCol] = letter
        guess[currentCol] = letter
        currentCol++
    }
    console.log(guess)
    console.log(board)
}

function updateBoard (){
    board.forEach((row , rIndex) => {
        row.forEach((cell , cIndex) => {
            const index = rIndex *5 + cIndex
            boardEl[index].textContent = cell

        })
    });

}



/*----------------------------- Event Listeners -----------------------------*/
init()

for (let one of kyebardEl){
    one.addEventListener('click', key )
}

