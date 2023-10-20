let score = JSON.parse(localStorage.getItem ('score')) || {
    wins: 0,
    draws: 0,
    losses: 0
}

updateScoreElement ();


function playGame (playerMove) {
    const computerMove = pickComputerMove();
    let result = ('');
    
    if (playerMove  === 'Scissors') {
        if ( computerMove === 'Rock') {
        result = ('You Lose')
        }
        else if (computerMove === 'Paper') {
            result = ('Victory')
        }
        else if (computerMove === 'Scissors') {
            result = ('Tie')
        }
    } else if (playerMove === 'Paper') {
        if ( computerMove === 'Rock') {
            result = ('Victory')
        }
        else if (computerMove === 'Paper') {
            result = ('Tie')
        }
        else if (computerMove === 'Scissors') {
            result = ('You Lose')
        }
    }
    else if (playerMove === 'Rock') {
        if ( computerMove === 'Rock') {
        result = ('Tie')
        }
        else if (computerMove === 'Paper') {
        result = ('You Lose')
        }
        else if (computerMove === 'Scissors') {
         result = ('Victory')
        }
    } 

    if (result === 'Victory'){
        score.wins += 1;
    } else if (result === 'Tie') {
        score.draws += 1;
    } else if (result === 'You Lose') {
        score.losses += 1;
    }

    localStorage.setItem ('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector ('.js-move').innerHTML = `You <img src="./Images/${playerMove}-emoji.png" class="move-icon">
    <img src="./Images/${computerMove}-emoji.png" class="move-icon"> Computer`;

}

function updateScoreElement() {
    let scoreElement = document.querySelector(`.js-score`);
    
    if (scoreElement) {
        scoreElement.innerHTML = `Wins: ${score.wins}, Draws: ${score.draws}, Losses: ${score.losses}`;
    } else {
        console.warn('Element with class .js-score not found.');
    }
}

function pickComputerMove () {
    let computerMove = ('');
    const randomNumber = Math.random();
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = ('Rock')
    }
    else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = ('Paper')
    } 
    else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = ('Scissors')
    }

    return computerMove; 
}