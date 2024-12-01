/*
$$$$$$$$\ $$\                 $$$$$$$$\                        $$$$$$$$\                         $$$$$$\  $$$$$$\
\__$$  __|\__|                \__$$  __|                       \__$$  __|                       $$  __$$\ \_$$  _|
   $$ |   $$\  $$$$$$$\          $$ | $$$$$$\   $$$$$$$\          $$ | $$$$$$\   $$$$$$\        $$ /  $$ |  $$ |
   $$ |   $$ |$$  _____|         $$ | \____$$\ $$  _____|         $$ |$$  __$$\ $$  __$$\       $$$$$$$$ |  $$ |
   $$ |   $$ |$$ /               $$ | $$$$$$$ |$$ /               $$ |$$ /  $$ |$$$$$$$$ |      $$  __$$ |  $$ |
   $$ |   $$ |$$ |               $$ |$$  __$$ |$$ |               $$ |$$ |  $$ |$$   ____|      $$ |  $$ |  $$ |
   $$ |   $$ |\$$$$$$$\          $$ |\$$$$$$$ |\$$$$$$$\          $$ |\$$$$$$  |\$$$$$$$\       $$ |  $$ |$$$$$$\
   \__|   \__| \_______|         \__| \_______| \_______|         \__| \______/  \_______|      \__|  \__|\______|



$$\      $$\ $$\           $$\ $$\      $$\                           $$\                          $$\
$$$\    $$$ |\__|          \__|$$$\    $$$ |                          $$ |                         \__|
$$$$\  $$$$ |$$\ $$$$$$$\  $$\ $$$$\  $$$$ | $$$$$$\  $$\   $$\       $$ |      $$$$$$\   $$$$$$\  $$\  $$$$$$$\
$$\$$\$$ $$ |$$ |$$  __$$\ $$ |$$\$$\$$ $$ | \____$$\ \$$\ $$  |      $$ |     $$  __$$\ $$  __$$\ $$ |$$  _____|
$$ \$$$  $$ |$$ |$$ |  $$ |$$ |$$ \$$$  $$ | $$$$$$$ | \$$$$  /       $$ |     $$ /  $$ |$$ /  $$ |$$ |$$ /
$$ |\$  /$$ |$$ |$$ |  $$ |$$ |$$ |\$  /$$ |$$  __$$ | $$  $$<        $$ |     $$ |  $$ |$$ |  $$ |$$ |$$ |
$$ | \_/ $$ |$$ |$$ |  $$ |$$ |$$ | \_/ $$ |\$$$$$$$ |$$  /\$$\       $$$$$$$$\\$$$$$$  |\$$$$$$$ |$$ |\$$$$$$$\
\__|     \__|\__|\__|  \__|\__|\__|     \__| \_______|\__/  \__|      \________|\______/  \____$$ |\__| \_______|
                                                                                         $$\   $$ |
                                                                                         \$$$$$$  |
                                                                                          \______/
 $$$$$$\  $$\           $$\                       $$\                          $$\
$$  __$$\ $$ |          $$ |                      $$ |                         \__|
$$ /  $$ |$$ | $$$$$$\  $$$$$$$\   $$$$$$\        $$ |      $$$$$$\   $$$$$$\  $$\  $$$$$$$\
$$$$$$$$ |$$ |$$  __$$\ $$  __$$\  \____$$\       $$ |     $$  __$$\ $$  __$$\ $$ |$$  _____|
$$  __$$ |$$ |$$ /  $$ |$$ |  $$ | $$$$$$$ |      $$ |     $$ /  $$ |$$ /  $$ |$$ |$$ /
$$ |  $$ |$$ |$$ |  $$ |$$ |  $$ |$$  __$$ |      $$ |     $$ |  $$ |$$ |  $$ |$$ |$$ |
$$ |  $$ |$$ |$$$$$$$  |$$ |  $$ |\$$$$$$$ |      $$$$$$$$\\$$$$$$  |\$$$$$$$ |$$ |\$$$$$$$\
\__|  \__|\__|$$  ____/ \__|  \__| \_______|      \________|\______/  \____$$ |\__| \_______|
              $$ |                                                   $$\   $$ |
              $$ |                                                   \$$$$$$  |
              \__|                                                    \______/

*/

// Constants
const PLAYER_X = 'X';
const PLAYER_O = 'O';
const GAME_STATES = {
    IN_PROGRESS: 'in progress',
    WIN: 'win',
    DRAW: 'draw'
};

// Game Data Object
const gameData = {
    board: ['', '', '', '', '', '', '', '', ''],
    currentPlayer: PLAYER_X,
    gameState: GAME_STATES.IN_PROGRESS,
    aiDifficulty: 'easy', // Initial difficulty
};

// DOM Elements
const blocks = document.querySelectorAll('.block');
const winnerDisplay = document.getElementById('winner');
const resetButton = document.getElementById('resetButton');
const darkModeToggle = document.getElementById('darkModeToggle');
const difficultySelect = document.getElementById('difficulty');

// Function to update the game state
function updateGameState() {
    if (checkWinCondition(gameData.board, gameData.currentPlayer)) {
        gameData.gameState = GAME_STATES.WIN;
    } else if (isBoardFull(gameData.board)) {
        gameData.gameState = GAME_STATES.DRAW;
    } else {
        gameData.gameState = GAME_STATES.IN_PROGRESS    }

    // Update UI based on game state
    switch (gameData.gameState) {
        case GAME_STATES.WIN:
            endGame(false);
            break;
        case GAME_STATES.DRAW:
            endGame(true);
            break;
        default:
            // Game still in progress, update current player display (if needed)
            break;

    }
}




// Function to handle block clicks
function handleBlockClick(blockId) {
    if (gameData.gameState !== GAME_STATES.IN_PROGRESS || gameData.board[blockId] !== '') {
        return;
    }

    gameData.board[blockId] = gameData.currentPlayer;
    blocks[blockId].textContent = gameData.currentPlayer;
    blocks[blockId].classList.add('occupied');
    blocks[blockId].disabled = true; // Disable the clicked block
    blocks[blockId].style.color = getComputedStyle(document.body).getPropertyValue('--game-icon-color');

    updateGameState();

    if (gameData.gameState === GAME_STATES.IN_PROGRESS) {
        switchPlayer();
        if (gameData.currentPlayer === PLAYER_O) {
            // Add a small delay for the AI move to make it feel more natural
            setTimeout(makeAIMove, 500);


        }
    }
}

//Win condition check
function checkWinCondition(board, player) {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const combination of winCombinations) {
        const [a, b, c] = combination;
        if (
            board[a] === player &&
            board[b] === player &&
            board[c] === player
        ) {
            return combination; // Return winning combination
        }
    }
    return null;
}


// Function to check if the board is full
function isBoardFull(board) {
    return board.every(block => block !== '');
}

// Function to switch players
function switchPlayer() {
    gameData.currentPlayer = gameData.currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
}




// AI Move Logic
function makeAIMove() {
    let bestMove = -1;
    switch (gameData.aiDifficulty) {
        case 'easy':
            bestMove = getRandomMove(gameData.board);
            break;
        case 'medium':
            bestMove = getMediumMove(gameData.board);
            break;
        case 'hard':
            bestMove = getHardMove(gameData.board);
            break;
    }

    if (bestMove !== -1) {
        handleBlockClick(bestMove);
    }
}

function getRandomMove(board) {
    const availableMoves = board
        .map((block, index) => (block === '' ? index : null))
        .filter(index => index !== null);
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
}


function getMediumMove(board) {
    // Check if AI can win
    let move = findWinningMove(board, PLAYER_O);
    if (move !== -1) return move;


    // Check if player can win and block
    move = findWinningMove(board, PLAYER_X);
    if (move !== -1) return move;

    return getRandomMove(board);

}

function findWinningMove(board, player) {
    const availableMoves = board
        .map((block, index) => (block === '' ? index : null))
        .filter(index => index !== null);


    for (const move of availableMoves) {
        const newBoard = [...board];
        newBoard[move] = player;
        if (checkWinCondition(newBoard, player)) {
            return move;
        }
    }

    return -1;
}


function getHardMove(board) {
    return minimax(board, PLAYER_O).index;
}



function minimax(board, player, alpha = -Infinity, beta = Infinity) {
    const winCombination = checkWinCondition(board, player)
    if (winCombination) {
        return { score: player === PLAYER_O ? 10 : -10, index: winCombination };
    }
    if (isBoardFull(board)) {
        return { score: 0, index: -1 };
    }

    const maximizing = player === PLAYER_O
    let best = maximizing ? { score: -Infinity, index: -1 } : { score: Infinity, index: -1 }


    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = player;
            const score = minimax(board, maximizing ? PLAYER_X : PLAYER_O, alpha, beta);


            board[i] = '';

            if (maximizing) {
                if (score.score > best.score) {
                    best = { score: score.score, index: i };
                    alpha = Math.max(alpha, score.score);
                }
            } else {
                if (score.score < best.score) {
                    best = { score: score.score, index: i };
                    beta = Math.min(beta, score.score)
                }

            }
            if (beta <= alpha) {
                break
            }


        }
    }

    return best;
}






// Function to end the game
function endGame(isDraw) {

    if (isDraw) {
        winnerDisplay.textContent = "It's a draw!";
    } else {
        winnerDisplay.textContent = `Player ${gameData.currentPlayer} wins!`;
        highlightWinningCombination(); // Highlight if it was a win
        startConfetti();
    }
    // Disable all blocks to prevent further moves
    blocks.forEach(block => {
        block.disabled = true;
    });
}


function highlightWinningCombination() {
    const winningCombination = checkWinCondition(gameData.board, gameData.currentPlayer);
    if (winningCombination) {
        winningCombination.forEach(index => {
            blocks[index].classList.add('win-block');
        });
    }

}



// Function to start the confetti effect
function startConfetti() {
    const confetti = new ConfettiGenerator({ target: 'my-canvas' });
    confetti.render();
}

// Function to reset the board
function resetBoard() {
    gameData.board = ['', '', '', '', '', '', '', '', ''];
    gameData.currentPlayer = PLAYER_X;
    gameData.gameState = GAME_STATES.IN_PROGRESS;
    winnerDisplay.textContent = '';

    blocks.forEach(block => {
        block.textContent = '';
        block.classList.remove('occupied', 'win-block');
        block.disabled = false; // Re-enable blocks
    });
}





// Dark mode toggle with Bootstrap classes
function toggleDarkMode({ target }) {
    document.body.classList.toggle('dark-mode', target.checked);
    document.getElementById("mainContainer").classList.toggle("bg-dark", target.checked);
    document.getElementById("mainContainer").classList.toggle("bg-light", !target.checked);
    document.getElementById("gameTitle").classList.toggle("text-light", target.checked);
    document.getElementById("gameTitle").classList.toggle("text-dark", !target.checked);
}







// Event Listeners
blocks.forEach((block, index) => {
    block.addEventListener('click', () => handleBlockClick(index));
});
resetButton.addEventListener('click', resetBoard);
darkModeToggle.addEventListener('change', toggleDarkMode);


difficultySelect.addEventListener('change', ({ target }) => {
    gameData.aiDifficulty = target.value;
    resetBoard(); // Reset the game when difficulty changes

});

// Initial setup
resetBoard();