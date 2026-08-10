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
    word = 'hello'
    guess = ['','','','','']
    remainingGuesses = numberOfGuesses
    gameOver = false

    updateBoard()
}

function key (event){

    if (gameOver) return

    
    letter = event.target.id
    console.log(letter)

    if(event.target.id === 'backspace'){}
    else if (event.target.id === 'enter'){}
    else addLetter()

    updateBoard()
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

