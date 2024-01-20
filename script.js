const board = document.getElementById("board");
const message = document.getElementById("message");
const playerXScore = document.getElementById("playerXScore");
const playerOScore = document.getElementById("playerOScore");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let playerXWins = 0;
let playerOWins = 0;

initializeBoard();

function initializeBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", i);
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = clickedCell.dataset.index;

    if (gameBoard[cellIndex] === "" && !isGameOver()) {
        gameBoard[cellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        
        if (isWinner()) {
            highlightWinnerCells();
            updateScore();
            message.textContent = `${currentPlayer} wins!`;
        } else if (isDraw()) {
            message.textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateMessage();
        }
    }
}

function updateMessage() {
    message.textContent = `Player ${currentPlayer}'s turn`;
}

function isWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function isDraw() {
    return gameBoard.every(cell => cell !== "");
}

function isGameOver() {
    return isWinner() || isDraw();
}

function highlightWinnerCells() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        const cells = document.querySelectorAll(`.cell[data-index="${a}"], .cell[data-index="${b}"], .cell[data-index="${c}"]`);
        cells.forEach(cell => cell.classList.add('winner'));
    });
}

function updateScore() {
    if (currentPlayer === "X") {
        playerXWins++;
        playerXScore.textContent = `Player X: ${playerXWins}`;
    } else {
        playerOWins++;
        playerOScore.textContent = `Player O: ${playerOWins}`;
    }
}

function resetGame() {
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('winner');
    });
    updateMessage();
    message.textContent = `Player ${currentPlayer}'s turn`;
}
