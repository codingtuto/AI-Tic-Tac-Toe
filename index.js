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
// Symbol definition for players
// Définition des symboles pour les joueurs
const player = "X";
const computer = "O";

// Variable indicating if the board is full
// Variable indiquant si le plateau est plein
let board_full = false;

// Game board represented as an array
// Plateau de jeu représenté sous forme de tableau
let play_board = ["", "", "", "", "", "", "", "", ""];

// Container element for the game board in the HTML document
// Élément conteneur du plateau de jeu dans le document HTML
const board_container = document.querySelector(".play-area");

// Element displaying the winner statement
// Élément affichant la déclaration du gagnant
const winner_statement = document.getElementById("winner");

// Function to check if the board is complete
// Fonction pour vérifier si le plateau est complet
check_board_complete = () => {
  let flag = true;
  play_board.forEach(element => {
    if (element != player && element != computer) {
      flag = false;
    }
  });
  board_full = flag;
};

// Helper function used in check_line() to mark the winning blocks
// Fonction d'aide utilisée dans check_line() pour marquer les blocs gagnants
const win_line = (winLine) => {
  for(i=0;i<3;i++){
    document.querySelector(`#block_${winLine[i]}`).classList.add("win-block");
  }
}

// Helper function used in check_match() function
// Fonction d'aide utilisée dans la fonction check_match()
const check_line = (a, b, c) => {
  var res  = (
    play_board[a] == play_board[b] &&
    play_board[b] == play_board[c] &&
    (play_board[a] == player || play_board[a] == computer)
  );

  return res;
};

// Function to check for a match
// Fonction pour vérifier s'il y a une correspondance
const check_match = () => {
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
  if (check_line(0, 4, 8)) {
    return [play_board[0],[0, 4, 8]];
  }
  if (check_line(2, 4, 6)) {
    return [play_board[2],[2, 4, 6]];
  }
  return ["",[-1,-1,-1]];
};

// Function to check for a winner
// Fonction pour vérifier s'il y a un gagnant
const check_for_winner = () => {
  let res = check_match()
  if (res[0] == player) {
    winner.innerText = "Player Won!!";
    winner.classList.add("playerWin");
    win_line(res[1]);
    board_full = true
     // Confetti Code here
    var confettiElement = document.getElementById('my-canvas');
    var confettiSettings = { target: confettiElement };
    var confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
    setTimeout(() => {confetti.clear()}, 3000); // clearing after 3
  } else if (res[0] == computer) {
    winner.innerText = "Computer Won";
    winner.classList.add("computerWin");
    win_line(res[1]);
    board_full = true
  } else if (board_full) {
    winner.innerText = "It's a Draw!";
    winner.classList.add("draw");
  }
};

// Function to render the game board
// Fonction pour afficher le plateau de jeu
const render_board = () => {
  board_container.innerHTML = ""
  play_board.forEach((e, i) => {
    board_container.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${play_board[i]}</div>`
    if (e == player || e == computer) {
      document.querySelector(`#block_${i}`).classList.add("occupied");
    }
  });
};

// Main game loop
// Boucle principale du jeu
const game_loop = () => {
  render_board();
  check_board_complete();
  check_for_winner();
};

// Function to add player's move
// Fonction pour ajouter le mouvement du joueur
const addPlayerMove = e => {
  if (!board_full && play_board[e] == "") {
    play_board[e] = player;
    game_loop();
    addComputerMove();
  }
};

// Function to add computer's move
// Fonction pour ajouter le mouvement de l'ordinateur
const addComputerMove = () => {
  if (!board_full) {
    selected = computeMoveAlphaBeta(play_board)[1]
    play_board[selected] = computer;
    game_loop();
  }
};

// MiniMax Algorithm for AI
// Algorithme MiniMax pour l'IA
const computeMoveMiniMax = (play_board, depth = 0, isComputer = true) => {
  let res = check_match()
  let bestScore;
  let bestMove;
  let possibleMoves
  if (res[0] == player) {
    return [-10 + depth, null]
  }
  else if (res[0] == computer) {
    return [10 - depth, null]
  }
  check_board_complete();
  if (board_full) {
    return [0, null]
  }
  else {
    if (isComputer) {
      bestScore = -9
      possibleMoves = []
      for (i = 0; i < play_board.length; i++) {
        if (play_board[i] == "") {
          possibleMoves.push(i);
        }
      }
      possibleMoves.forEach((move) => {
        play_board[move] = computer;
        score = computeMoveMiniMax(play_board, depth + 1, false)[0]
        if (score > bestScore) {
          bestScore = score;
          bestMove = move;
        }
        play_board[move] = "";
      });
      return [bestScore, bestMove]
    } else {
      bestScore = 9
      possibleMoves = []
      for (i = 0; i < play_board.length; i++) {
        if (play_board[i] == "") {
          possibleMoves.push(i);
        }
      }

      possibleMoves.forEach((move) => {
        play_board[move] = player;
        score = computeMoveMiniMax(play_board, depth + 1, true)[0]
        if (score < bestScore) {
          bestScore = score;
          bestMove = move;
        }
        play_board[move] = "";
      })
      return [bestScore, bestMove]
    }
  }
}

// Alpha-Beta Pruning Algorithm for AI
// Algorithme Alpha-Beta Pruning pour l'IA
const computeMoveAlphaBeta = (play_board, depth = 0, alpha = -Infinity, beta = +Infinity, isComputer = true) => {
  let res = check_match()
  let bestScore;
  let bestMove;
  let possibleMoves
  if (res[0] == player) {
    return [-10 + depth, null]
  }
  else if (res[0] == computer) {
    return [10 - depth, null]
  }
  check_board_complete();
  if (board_full) {
    return [0, null]
  }
  else {
    if (isComputer) {
      bestScore = -9
      possibleMoves = []
      for (i = 0; i < play_board.length; i++) {
        if (play_board[i] == "") {
          possibleMoves.push(i);
        }
      }
      possibleMoves.forEach((move) => {
        play_board[move] = computer;
        score = computeMoveAlphaBeta(play_board, depth + 1,alpha,beta, false)[0]
        // alpha = max(alpha, score)
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
      return [bestScore, bestMove]
    } else {
      bestScore = 9
      possibleMoves = []
      for (i = 0; i < play_board.length; i++) {
        if (play_board[i] == "") {
          possibleMoves.push(i);
        }
      }

      possibleMoves.forEach((move) => {
        play_board[move] = player;
        score = computeMoveAlphaBeta(play_board, depth + 1,alpha,beta ,true)[0]
        if(score<beta){
          beta=score
        }
        if (score < bestScore) {
          bestScore = score;
          bestMove = move;
        }
        play_board[move] = "";
        if(beta<=alpha){
          return 0,0;
        }
      })
      return [bestScore, bestMove]
    }
  }
}

// Function to reset the game board
// Fonction pour réinitialiser le plateau de jeu
const reset_board = () => {
  play_board = ["", "", "", "", "", "", "", "", ""];
  board_full = false;
  winner.classList.remove("playerWin");
  winner.classList.remove("computerWin");
  winner.classList.remove("draw");
  winner.innerText = "";
  render_board();
};

// Initial render of the game board
// Affichage initial du plateau de jeu
render_board();

// Dark mode function
// Fonction de mode sombre
const myFunction = () => {
  var element = document.body;
  element.classList.toggle("dark");
}
