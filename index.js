const cells = document.querySelectorAll('.cell');  
const statusDisplay = document.getElementById('status');  
const restartButton = document.getElementById('restartButton');  

let currentPlayer = 'X';  
let gameActive = true;  
let gameState = ['', '', '', '', '', '', '', '', ''];  

// Winning conditions  
const winningConditions = [  
    [0, 1, 2],  
    [3, 4, 5],  
    [6, 7, 8],  
    [0, 3, 6],  
    [1, 4, 7],  
    [2, 5, 8],  
    [0, 4, 8],  
    [2, 4, 6]  
];  

// Cell click event  
cells.forEach((cell, index) => {  
    cell.addEventListener('click', () => handleCellClick(index));  
});  

// Handle cell click  
function handleCellClick(index) {  
    if (gameState[index] !== '' || !gameActive) {  
        return;  
    }  
    
    gameState[index] = currentPlayer;  
    cellClicked(index);  
    
    // Check for win or draw  
    checkResult();  
}  

// Update the clicked cell  
function cellClicked(index) {  
    cells[index].textContent = currentPlayer;  
}  

// Check result  
function checkResult() {  
    let roundWon = false;  
    
    for (let i = 0; i < winningConditions.length; i++) {  
        const [a, b, c] = winningConditions[i];  
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {  
            continue;  
        }  
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {  
            roundWon = true;  
            break;  
        }  
    }  
    
    if (roundWon) {  
        statusDisplay.textContent = `${currentPlayer} has won!`;  
        gameActive = false;  
        return;  
    }  
    
    if (!gameState.includes('')) {  
        statusDisplay.textContent = 'It\'s a draw!';  
        gameActive = false;  
        return;  
    }  
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';  
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;  
}  

// Restart game  
restartButton.addEventListener('click', restartGame);  

function restartGame() {  
    gameActive = true;  
    currentPlayer = 'X';  
    gameState = ['', '', '', '', '', '', '', '', ''];  
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;  
    cells.forEach(cell => cell.textContent = '');  
}  

// Initial status  
statusDisplay.textContent = `It's ${currentPlayer}'s turn`;