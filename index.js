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
                                                                                                                  

// Variables globales du jeu
const gameData = {
    board: ['', '', '', '', '', '', '', '', ''],
    currentPlayer: 'X',
    gameOver: false,
    aiDifficulty: 'facile' // 'facile', 'moyen', 'difficile'
};

// Sélection des éléments du DOM
const blocks = document.querySelectorAll('.block');
const winnerDisplay = document.getElementById('winner');
const resetButton = document.querySelector('button');
const darkModeSwitch = document.querySelector('.switch input');

// Fonction pour gérer les clics sur les blocs
function handleBlockClick(blockId) {
    if (gameData.gameOver || gameData.board[blockId] !== '') {
        return;
    }

    gameData.board[blockId] = gameData.currentPlayer;
    blocks[blockId].textContent = gameData.currentPlayer;
    blocks[blockId].classList.add('occupied'); 

    if (checkWinCondition()) {
        endGame(false);
    } else if (isBoardFull()) {
        endGame(true);
    } else {
        switchPlayer();
        if (gameData.currentPlayer === 'O') {
            makeAIMove();
        }
    }
}

// Fonction pour vérifier la condition de victoire
function checkWinCondition() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // lignes
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // colonnes
        [0, 4, 8], [2, 4, 6] // diagonales
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            gameData.board[a] &&
            gameData.board[a] === gameData.board[b] &&
            gameData.board[a] === gameData.board[c]
        ) {
            blocks[a].classList.add('win-block');
            blocks[b].classList.add('win-block');
            blocks[c].classList.add('win-block');
            return true;
        }
    }
    return false;
}

// Fonction pour vérifier si le tableau de jeu est plein
function isBoardFull() {
    return gameData.board.every(block => block !== '');
}

// Fonction pour changer de joueur
function switchPlayer() {
    gameData.currentPlayer = gameData.currentPlayer === 'X' ? 'O' : 'X';
}

// Fonction pour effectuer le mouvement de l'IA
function makeAIMove() {
    let availableBlocks = gameData.board.map((block, index) => block === '' ? index : null).filter(block => block !== null);

    if (availableBlocks.length > 0) {
        let move = -1;

        switch (gameData.aiDifficulty) {
            case 'facile':
                move = getRandomMove(availableBlocks);
                break;
            case 'moyen':
                move = getMediumMove(availableBlocks);
                break;
            case 'difficile':
                move = getDifficultMove();
                break;
        }

        if (move !== -1) {
            handleBlockClick(move);
        }
    }
}

// Fonction pour obtenir un mouvement aléatoire
function getRandomMove(availableBlocks) {
    const randomIndex = Math.floor(Math.random() * availableBlocks.length);
    return availableBlocks[randomIndex];
}

// Fonction pour obtenir un mouvement de niveau moyen
function getMediumMove(availableBlocks) {
    // Essayer de gagner
    let move = getWinningMove(availableBlocks, 'O');
    if (move !== -1) return move;

    // Bloquer l'adversaire
    move = getWinningMove(availableBlocks, 'X');
    if (move !== -1) return move;

    // Choisir un mouvement aléatoire
    return getRandomMove(availableBlocks);
}

// Fonction pour obtenir un mouvement gagnant (si possible)
function getWinningMove(availableBlocks, player) {
    for (let i = 0; i < availableBlocks.length; i++) {
        let tempBoard = [...gameData.board];
        tempBoard[availableBlocks[i]] = player;
        if (checkWinConditionForBoard(tempBoard)) {
            return availableBlocks[i];
        }
    }
    return -1;
}

// Fonction pour vérifier la condition de victoire pour un tableau donné
function checkWinConditionForBoard(board) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // lignes
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // colonnes
        [0, 4, 8], [2, 4, 6] // diagonales
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return true;
        }
    }
    return false;
}

// Fonction pour obtenir un mouvement difficile (Minimax)
function getDifficultMove() {
    let bestScore = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < gameData.board.length; i++) {
        if (gameData.board[i] === '') {
            gameData.board[i] = 'O';
            let score = minimax(gameData.board, 0, false);
            gameData.board[i] = '';

            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    return bestMove;
}

// Fonction Minimax
function minimax(board, depth, isMaximizing) {
    if (checkWinConditionForBoard(board)) {
        return isMaximizing ? -10 + depth : 10 - depth;
    } else if (isBoardFullForBoard(board)) {
        return 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

// Fonction pour vérifier si le tableau est plein pour un tableau donné
function isBoardFullForBoard(board) {
    return board.every(block => block !== '');
}

// Fonction pour terminer le jeu
function endGame(isDraw) {
    gameData.gameOver = true;
    if (isDraw) {
        winnerDisplay.textContent = 'Match nul!';
    } else {
        winnerDisplay.textContent = `Le joueur ${gameData.currentPlayer} a gagné!`;
        startConfetti();
    }
}

// Fonction pour démarrer l'effet confetti
function startConfetti() {
    const confetti = new ConfettiGenerator({ target: 'my-canvas' });
    confetti.render();
}

// Fonction pour réinitialiser le jeu
function resetBoard() {
    gameData.board = ['', '', '', '', '', '', '', '', ''];
    gameData.currentPlayer = 'X';
    gameData.gameOver = false;
    winnerDisplay.textContent = '';
    blocks.forEach(block => {
        block.textContent = '';
        block.classList.remove('occupied', 'win-block');
    });
}

// Fonction pour basculer le mode sombre
function toggleDarkMode() {
    document.body.classList.toggle('dark');
}

// Ajout d'écouteurs d'événements
blocks.forEach((block, index) => {
    block.addEventListener('click', () => handleBlockClick(index));
});

resetButton.addEventListener('click', resetBoard);

// Initialisation du jeu
resetBoard();
