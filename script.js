let gameBoard = [];
let currentPlayer = "X";
let gameOver = false;
let gameCount = 0;
let player1Name = "";
let player2Name = "";
let gameHistory = [];

function startGame() {
    player1Name = document.getElementById("player1").value.trim();
    player2Name = document.getElementById("player2").value.trim();

    if (player1Name === "" || player2Name === "") {
        alert("Please enter names for both players.");
        return;
    }
    gameBoard = [];
    for (let i = 0; i < 9; i++) {
        gameBoard.push("");
        document.getElementById(`cell-${i}`).addEventListener("click", handleCellClick);
    }

    currentPlayer = "X";
    gameOver = false;
    gameCount++;
    updateGameStatus();
    document.getElementById("currentPlayer").textContent = `Current Turn: ${currentPlayer === "X" ? player1Name : player2Name}`;
    document.getElementById("gameResult").textContent = "";
}
function handleCellClick(event) {
    if (gameOver) return;
    const cellIndex = event.target.id.split("-")[1];
    if (gameBoard[cellIndex] === "") {
        gameBoard[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;
        checkWinningCondition();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateGameStatus();
    }
}

function checkWinningCondition() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];
        if (
            gameBoard[combination[0]] === gameBoard[combination[1]] &&
            gameBoard[combination[1]] === gameBoard[combination[2]] &&
            gameBoard[combination[0]] !== ""
        ) {
            gameOver = true;
            let winner = gameBoard[combination[0]] === "X" ? player1Name : player2Name;
            gameHistory.push({ winner: winner, gameNumber: gameCount });
            document.getElementById("gameResult").textContent = `Player ${winner} wins! Game ${gameCount} completed.`;
            updateGameHistory();
            return;
        }
    }

    if (!gameBoard.includes("")) {
        gameOver = true;
        gameHistory.push({ winner: "Draw", gameNumber: gameCount });
        document.getElementById("gameResult").textContent = `It's a draw! Game ${gameCount} completed.`;
        updateGameHistory();
    }
}

function updateGameStatus() {
    document.getElementById("currentPlayer").textContent = `Current Turn: ${currentPlayer === "X" ? player1Name : player2Name}`;
}

function updateGameHistory() {
    let historyList = document.getElementById("historyList");
    historyList.innerHTML = "";
    gameHistory.forEach((game, index) => {
        let listItem = document.createElement("li");
        if (game.winner === "Draw") {
            listItem.textContent = `Game ${game.gameNumber}: Draw`;
        } else {
            listItem.textContent = `Game ${game.gameNumber}: Winner - ${game.winner}`;
        }
        historyList.appendChild(listItem);
    });
}

function resetGame() {
    gameBoard = [];
    currentPlayer = "X";
    gameOver = false;
    gameCount++;
    for (let i = 0; i < 9; i++) {
        gameBoard.push("");
        document.getElementById(`cell-${i}`).textContent = "";
    }
    updateGameStatus();
    document.getElementById("gameResult").textContent = "";
}
