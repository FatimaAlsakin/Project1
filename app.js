import {WORDS} from "./words.js";
console.log(WORDS)
/*-------------------------------- Constants --------------------------------*/
const numberOfGuesses = 6
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

const youWinPopUp = new Popup({
    id: "my-popup2",
    title: "<span style='font-weight: bold;' >Congratulations! You Win!🎉</span>",
    content: `<button id="playAgain" class="btn btn-primary">Play Again</button>`,
});





/*---------------------------- Variables (state) ----------------------------*/
let remainingGuesses 
let word
let guess
let currentRow
let currentCol
let letter 
let board
let gameOver
let count 
let youLossPopUp
/*------------------------ Cached Element References ------------------------*/
const boardEl = document.querySelectorAll('.sqr')
console.log(boardEl)
const kyebardEl = document.querySelectorAll('.key')
console.log(kyebardEl)
const howToPlayEl = document.querySelector('#howToPlay')
console.log(howToPlayEl)
const messageEl = document.querySelector('#message')
const playAgainEl = document.querySelector('#playAgain')
const winPopUpEl = document.querySelector('#my-popup2')
const lossPopUpEl = document.querySelector('#my-popup3')
const hintEl = document.querySelector('#hint')

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
    messageEl.textContent = ''
    count = 0

    boardEl.forEach((cell) => {
        cell.textContent = ''
        cell.classList.remove('green','yellow','grey')
    })

    kyebardEl.forEach((key) => {
        key.classList.remove('green','yellow','grey')
    })


    chooseWord()
    updateBoard()
}

function chooseWord (){
    word = WORDS[Math.floor(Math.random() * WORDS.length)]
    console.log(word)
}

function key (event){
    // if( currentCol < 5 && guess[currentCol] !== ''){
    //     currentCol++
    //     return
    // }

    if (gameOver) return
    letter = event.target.id
    console.log(letter)

    if(event.target.id === 'backspace'){
        backSpace()
    }
    else if (event.target.id === 'enter'){
        enter()

    }
    else addLetter()
    
    messageEl.textContent = ''
    updateBoard()
}

function backSpace(){
    console.log('backspace')
    if(currentCol > 0 ){
        currentCol--
        guess[currentCol] = ''
        board[currentRow][currentCol] = ''
        
    }

    messageEl.textContent = ''
    updateBoard()
    
}

function enter(){
    console.log(guess.join(''))

    if(currentCol === 5){
        if(guess.join('') === word){
            letterStatus()
            youWinPopUp.show()
            gameOver = true
        }
        else{
            isValidWord()
            if (currentRow === 6 ){
                youloss()
                gameOver= true
                return
            }
        }
    }
    else{
        messageEl.textContent ="Not A 5 letter word"
    }

}

function youloss(){
    let w = word
    youLossPopUp = new Popup({
    id: "my-popup3",
    title: "<span style='font-weight: bold;' >Game Over! You Lost!😔</span>",
    content: `The correct word was: <span style='font-weight: bold;'>${w}</span><br><br><button id="playAgain" class="btn btn-primary">Play Again</button>`,
    });

    youLossPopUp.show()
}


function isValidWord(){
    if(WORDS.includes(guess.join(''))){
        messageEl.textContent= 'Not the right word'
        currentCol = 0 
        letterStatus()
        currentRow ++
        guess = ['','','','','']
    }
    else{
        messageEl.textContent = 'Not a valid word'

    }
}

function addLetter(){
    
    while (currentCol < 5 && guess[currentCol] !== '') {
        currentCol++
    }
    if (currentCol< 5 ){
        board[currentRow][currentCol] = letter.toUpperCase()
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
        return 
    }

    updateBoard()
}

function playAgain(){
    youWinPopUp.hide()
    youLossPopUp.hide()
    init()
}

function hint(){

    let w = word.split('')
    let l = w[Math.floor(Math.random() * w.length)]
    console.log(l)
    if (count === 0){
        if(guess.indexOf(l) === w.indexOf(l)){
            l = w[Math.floor(Math.random() * w.length)]
            let index = currentRow * 5 + w.indexOf(l)
            boardEl[index].classList.add('green')
            boardEl[index].textContent = l.toUpperCase()
            board[currentRow][w.indexOf(l)] = l.toUpperCase()
            guess[w.indexOf(l)] = l

            count++
        }
        else{ 
            let index = currentRow * 5 + w.indexOf(l)
            boardEl[index].classList.add('green')
            boardEl[index].textContent = l.toUpperCase()
            board[currentRow][w.indexOf(l)] = l.toUpperCase()
            guess[w.indexOf(l)] = l
            count++
        }
    }
    else{
        messageEl.textContent = 'You have already used your hint'
    }

    updateBoard()

    
   
}

/*----------------------------- Event Listeners -----------------------------*/
init()

for (let one of kyebardEl){
    one.addEventListener('click', key )
}

howToPlayEl.addEventListener('click', () => {
    howToPlayPopup.show()
})

document.addEventListener('keydown', handlePhysicalKey)

document.addEventListener('click', (event) => {
    if (event.target.id === 'playAgain'){
        playAgain()
    }
})

hintEl.addEventListener('click',hint)

