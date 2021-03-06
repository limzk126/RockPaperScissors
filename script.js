const header = document.querySelector('.header');
const roundWinnerDisplay = document.querySelector('.roundWinnerDisplay');
const scoreBoardContainer = document.querySelector('.scoreboard-container');
const playerScoreBoard = document.querySelector('.playerScoreBoard');
const computerScoreBoard = document.querySelector('.computerScoreBoard');
const rockButton = document.querySelector('.rockButton');
const scissorButton = document.querySelector('.scissorButton');
const paperButton = document.querySelector('.paperButton');
const resultDisplay = document.querySelector('.resultDisplay');
const playAgainContainer = document.querySelector('.playAgain-container');
const playAgainButton = document.createElement('button');

const SCISSOR = 0;
const PAPER = 1;
const ROCK = 2;

let playerScore = 0;
let computerScore = 0;

rockButton.addEventListener('click', () => {
    playRound(ROCK, computerPlay());
    updateScoreBoard();
});
scissorButton.addEventListener('click', () => {
    playRound(SCISSOR, computerPlay());
    updateScoreBoard();
});
paperButton.addEventListener('click', () => {
    playRound(PAPER, computerPlay());
    updateScoreBoard();
});

function computerPlay() {
    const id = Math.floor(Math.random() * 3);

    if (id == 0) {
        return SCISSOR;
    } else if (id == 1) {
        return PAPER;
    } else {
        //id == 2
        return ROCK
    }
}

function updateScoreBoard() {
    playerScoreBoard.textContent = "player: " + playerScore;
    computerScoreBoard.textContent = "computer: " + computerScore;
}

function playRound(playerSelection, computerSelection) {
    if (playerScore >= 5 || computerScore >= 5) {
        return;
    }

    if (playerSelection == computerSelection) {
        roundWinnerDisplay.textContent = "Its a draw!";
        return;
    }

    switch (playerSelection) {
    case SCISSOR:
        if (computerSelection == PAPER) {
            playerWinRound();
        } else {
            computerWinRound();
        }
        break;
    case PAPER:
        if (computerSelection == ROCK) {
            playerWinRound();
        } else {
            computerWinRound();
        }
        break;
    case ROCK:
        if (computerSelection == SCISSOR) {
            playerWinRound();
        } else {    
            computerWinRound();
        }
        break;
    default:
        throw new Error("Invalid Input!");
    }

    if (isWinnerExist()) {
        endGame();
    }
}

function isWinnerExist() {
    return playerScore == 5 || computerScore == 5;
}

function endGame() {
    if (playerScore == 5) {
        resultDisplay.textContent = "Congrats! you won the first to 5!";
        showPlayAgainButton();
    } else if (computerScore == 5) {
        resultDisplay.textContent = "You lost the first to 5! Better luck next time!";
        showPlayAgainButton();
    }
}

function showPlayAgainButton() {
    playAgainButton.textContent = "Play again!";
    playAgainButton.addEventListener('click', newGame);
    playAgainContainer.appendChild(playAgainButton);
}

function newGame() {
    playAgainContainer.removeChild(playAgainButton);
    roundWinnerDisplay.textContent = "";
    playerScoreBoard.textContent = "";
    computerScoreBoard.textContent = "";
    resultDisplay.textContent = "";
    computerScore = 0;
    playerScore = 0;
}

function playerWinRound() {
    playerScore++;
    roundWinnerDisplay.textContent = "You win this round!";
}

function computerWinRound() {
    computerScore++;
    roundWinnerDisplay.textContent = "Computer wins this round!";
}