const roundWinnerDisplay = document.querySelector('.roundWinnerDisplay');
const playerScoreBoard = document.querySelector('.playerScoreBoard');
const computerScoreBoard = document.querySelector('.computerScoreBoard');
const rockButton = document.querySelector('.rockButton');
const scissorButton = document.querySelector('.scissorButton');
const paperButton = document.querySelector('.paperButton');
const resultDisplay = document.querySelector('.resultDisplay');

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
    playerScoreBoard.textContent = playerScore;
    computerScoreBoard.textContent = computerScore;
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

    if (playerScore == 5) {
        resultDisplay.textContent = "Congrats! you won the best out of 5!";
        return
    } else if (computerScore == 5) {
        resultDisplay.textContent = "You lost the best out of 5! Better luck next time!";
    }
}

function playerWinRound() {
    playerScore++;
    roundWinnerDisplay.textContent = "You win this round!";
}

function computerWinRound() {
    computerScore++;
    roundWinnerDisplay.textContent = "Computer wins this round!";
}

function game() {
    let playerWinCount = 0;
    let computerWinCount = 0;

    for (let i = 0; i < 5; i++) {
        let playerSelection = prompt(`Round ${i + 1}: `).toLowerCase();
        let computerSelection = computerPlay().toLowerCase();


        try {
            const roundOutcome = playRound(playerSelection, computerSelection);

            if (roundOutcome == 1) {
                playerWinCount++;
                console.log(`You Win! ${playerSelection} beats ${computerSelection}!`);
            } else if (roundOutcome == 2) {
                console.log("Its a draw!");
            } else {
                computerWinCount++;
                console.log(`You Lose! ${computerSelection} beats ${playerSelection}!`);
            }
        } catch(e) {
            console.log("Invalid Input!");
            i--;
        }
    }

    if (playerWinCount > computerWinCount) {
        console.log("Congrats, you are the overall winner!");
    } else if (computerWinCount > playerWinCount) {
        console.log("You lost overall, better luck next time!");
    } else {
        console.log("Its a tie!");
    }
}