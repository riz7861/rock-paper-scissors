let score = JSON.parse(localStorage.getItem ('score')) || {
    wins: 0,
    draws: 0,
    losses: 0
}

updateScoreElement ();

isautoplaying = false;

let intervalid;

let button = document.querySelector(".js-auto-play");

if (button) {
    button.addEventListener("click,", autoplay);
} else {
    console.error("Button with class .js-auto-play not found!");
}
function autoplay() {
    let button = document.querySelector(".js-auto-play");

    if (button) {
        if (!isautoplaying) {
            button.innerHTML = 'Active';

            intervalid = setInterval(() => {
                const playerMove = pickComputerMove();
                playGame(playerMove);
            }, 1000);
            isautoplaying = true;
        } else {
            button.innerHTML = 'Auto Play'; // or whatever the original text was

            clearInterval(intervalid);
            isautoplaying = false;
        }
    } else {
        console.error("Button with class .js-auto-play not found!");
    }
}



document.querySelector('.js-auto-play').addEventListener('click', () => {
        autoplay();
    });

document.querySelector('.js-rock-button').addEventListener('click', () => {
        playGame ('Rock');
    });

document.querySelector('.js-paper-button').addEventListener('click', () => {
        playGame ('Paper');
    });

document.querySelector('.js-scissors-button').addEventListener('click', () => {
        playGame ('Scissors');
    });

document.body.addEventListener ('keydown', (event) => {
    if (event.key === 'r') {
        playGame ('Rock'); 
    }
    else if (event.key === 'p') {
        playGame ('Paper');
    }    
    else if (event.key === 's') {
            playGame ('Scissors');
    }
    else if (event.key === 'a') {
        autoplay();
    }
    else if (event.key === 'Backspace') {
        resetScoreAndLocalStorage();
    }

});

document.querySelector('.js-reset').addEventListener('click', resetScoreAndLocalStorage);



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

function resetScoreAndLocalStorage() {
    let isConfirmed = window.confirm("Are you sure you want to reset the score?");
    
    if (isConfirmed) {
        score.wins = 0;
        score.draws = 0;
        score.losses = 0;
        localStorage.removeItem('score');
        updateScoreElement();
        alert('Score reset successfully!');
    } else {
        alert('Score reset canceled.');
    }
}
