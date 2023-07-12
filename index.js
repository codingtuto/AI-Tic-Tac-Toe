// Tic-Tac-Toe game implementation

// Constants for player and computer symbols
const player = "X"; // Le symbole du joueur
const computer = "O"; // Le symbole de l'ordinateur

// Variable to track if the board is full
let board_full = false; // Variable pour suivre si le tableau est rempli

// Array to represent the game board
let play_board = ["", "", "", "", "", "", "", "", ""]; // Tableau pour représenter le plateau de jeu

// Get the board container element
const board_container = document.querySelector(".play-area"); // Récupérer l'élément du conteneur du plateau de jeu

// Get the winner statement element
const winner_statement = document.getElementById("winner"); // Récupérer l'élément indiquant le gagnant

// Function to check if the board is fully occupied
const check_board_complete = () => { // Fonction pour vérifier si le tableau est entièrement occupé
    let flag = true;
    play_board.forEach(element => {
        if (element != player && element != computer) {
            flag = false;
        }
    });
    board_full = flag;
};

// Helper function used in check_line() to mark the winning blocks
const win_line = (winLine) => { // Fonction auxiliaire utilisée dans check_line() pour marquer les blocs gagnants
    for(i=0;i<3;i++){
        document.querySelector(`#block_${winLine[i]}`).classList.add("win-block");
    }
}

// Helper function used in check_match() function to check for a winning line
const check_line = (a, b, c) => { // Fonction auxiliaire utilisée dans la fonction check_match() pour vérifier une ligne gagnante
    var res  = (
            play_board[a] == play_board[b] &&
            play_board[b] == play_board[c] &&
            (play_board[a] == player || play_board[a] == computer)
        );
  
    return res;
};

// Function to check for a winning combination on the board
const check_match = () => { // Fonction pour vérifier une combinaison gagnante sur le plateau
    for (i = 0; i < 9; i += 3) {
        if (check_line(i, i + 1, i + 2)) {
            return [play_board[i],[i, i + 1, i + 2]];
        }
    }
    for (i = 0; i < 3; i++) {
        if (check_line(i, i + 3, i + 6)) {
            return [play_board[i],[i, i + 3, i + 6]];
        }
    }
    // Check diagonals
    if (check_line(0, 4, 8)) {
        return [play_board[0],[0, 4, 8]];
    }
    if (check_line(2, 4, 6)) {
        return [play_board[2],[2, 4, 6]];
    }
    return ["",[-1,-1,-1]];
};

// Function to check for a winner or draw
const check_for_winner = () => { // Fonction pour vérifier s'il y a un gagnant ou un match nul
    let res = check_match()
    if (res[0] == player) {
        winner_statement.innerText = "Player Won!!"; // Le joueur a gagné !!
        winner_statement.classList.add("playerWin");
        win_line(res[1]);
        board_full = true;
         // Confetti Code here
        var confettiElement = document.getElementById('my-canvas');
        var confettiSettings = { target: confettiElement };
        var confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();
        setTimeout(() => {confetti.clear()}, 3000); // clearing after 3
    } else if (res[0] == computer) {
        winner_statement.innerText = "Computer Won"; // L'ordinateur a gagné
        winner_statement.classList.add("computerWin");
        win_line(res[1]);
        board_full = true;
    } else if (board_full) {
        winner_statement.innerText = "It's a Draw!"; // C'est un match nul !
        winner_statement.classList.add("draw");
    }
};

// Function to render the game board
const render_board = () => { // Fonction pour afficher le plateau de jeu
    board_container.innerHTML = "";
    play_board.forEach((e, i) => {
        board_container.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${play_board[i]}</div>`;
        if (e == player || e == computer) {
            document.querySelector(`#block_${i}`).classList.add("occupied");
        }
    });
};

// Function to update the game state after a player's move
const addPlayerMove = e => { // Fonction pour mettre à jour l'état du jeu après le coup du joueur
    if (!board_full && play_board[e] == "") {
        play_board[e] = player;
        game_loop();
        addComputerMove();
    }
};

// Function to update the game state after the computer's move
const addComputerMove = () => { // Fonction pour mettre à jour l'état du jeu après le coup de l'ordinateur
    if (!board_full) {
        selected = computeMoveAlphaBeta(play_board)[1];
        play_board[selected] = computer;
        game_loop();
    }
};

// Artificial Intelligence based MiniMax Algorithm
const computeMoveMiniMax = (play_board, depth = 0, isComputer = true) => {
    let res = check_match();
    let bestScore;
    let bestMove;
    let possibleMoves;
    if (res[0] == player) {
        return [-10 + depth, null];
    }
    else if (res[0] == computer) {
        return [10 - depth, null];
    }
    check_board_complete();
    if (board_full) {
        return [0, null];
    }
    else {
        if (isComputer) {
            bestScore = -9;
            possibleMoves = [];
            for (i = 0; i < play_board.length; i++) {
                if (play_board[i] == "") {
                    possibleMoves.push(i);
                }
            }
            possibleMoves.forEach((move) => {
                play_board[move] = computer;
                score = computeMoveMiniMax(play_board, depth + 1, false)[0];
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
                play_board[move] = "";
            });
            return [bestScore, bestMove];
        } else {
            bestScore = 9;
            possibleMoves = [];
            for (i = 0; i < play_board.length; i++) {
                if (play_board[i] == "") {
                    possibleMoves.push(i);
                }
            }

            possibleMoves.forEach((move) => {
                play_board[move] = player;
                score = computeMoveMiniMax(play_board, depth + 1, true)[0];
                if (score < bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
                play_board[move] = "";
            });
            return [bestScore, bestMove];
        }
    }
};

// Artificial Intelligence based Alpha-Beta-Pruning Algorithm
const computeMoveAlphaBeta = (play_board, depth = 0, alpha = -Infinity, beta = +Infinity, isComputer = true) => {
    let res = check_match();
    let bestScore;
    let bestMove;
    let possibleMoves;
    if (res[0] == player) {
        return [-10 + depth, null];
    }
    else if (res[0] == computer) {
        return [10 - depth, null];
    }
    check_board_complete();
    if (board_full) {
        return [0, null];
    }
    else {
        if (isComputer) {
            bestScore = -9;
            possibleMoves = [];
            for (i = 0; i < play_board.length; i++) {
                if (play_board[i] == "") {
                    possibleMoves.push(i);
                }
            }
            possibleMoves.forEach((move) => {
                play_board[move] = computer;
                score = computeMoveAlphaBeta(play_board, depth + 1,alpha,beta, false)[0];
                if(score>alpha){
                    alpha=score;
                }
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
                play_board[move] = "";
                if (beta < alpha) {
                    return 0,0;
                }
            });
            return [bestScore, bestMove];
        } else {
            bestScore = 9;
            possibleMoves = [];
            for (i = 0; i < play_board.length; i++) {
                if (play_board[i] == "") {
                    possibleMoves.push(i);
                }
            }

            possibleMoves.forEach((move) => {
                play_board[move] = player;
                score = computeMoveAlphaBeta(play_board, depth + 1,alpha,beta ,true)[0];
                if(score<beta){
                    beta=score;
                }
                if (score < bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
                play_board[move] = "";
                if(beta<=alpha){
                    return 0,0;
                }
            });
            return [bestScore, bestMove];
        }
    }
};

// Function to reset the game board
const reset_board = () => { // Fonction pour réinitialiser le plateau de jeu
    play_board = ["", "", "", "", "", "", "", "", ""];
    board_full = false;
    winner_statement.classList.remove("playerWin");
    winner_statement.classList.remove("computerWin");
    winner_statement.classList.remove("draw");
    winner_statement.innerText = "";
    render_board();
};

// Initial rendering of the game board
render_board();
// Dark mode
const myFunction = ()=> {
    var element = document.body;
    element.classList.toggle("dark");
}
