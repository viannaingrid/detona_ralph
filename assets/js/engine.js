const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        timerId: null,
        countDownTimerId: null,
        gameVelocity: 800,
        hitPosition: null,
        result: 0,
        currentTime: 60,
    },
};

function countDown() {
    if (state.view.timeLeft) {
        state.values.currentTime--;
        state.view.timeLeft.textContent = state.values.currentTime;

        if (state.values.currentTime <= 0) {
            clearInterval(state.values.countDownTimerId);
            clearInterval(state.values.timerId);
            alert("O seu tempo acabou! O seu resultado foi: " + state.values.result);
        }
    }
}

function playSound() {
    const audio = new Audio("../audio/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    if (state.view.squares) {
        state.view.squares.forEach((square) => square.classList.remove("enemy"));
        const randomNumber = Math.floor(Math.random() * 9);
        const randomSquare = state.view.squares[randomNumber];
        randomSquare.classList.add("enemy");
        state.values.hitPosition = randomSquare.id;
    }
}

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                if (state.view.score) {
                    state.view.score.textContent = state.values.result;
                }
                state.values.hitPosition = null;
                playSound();
            }
        });
    });
}

function init() {
    state.values.countDownTimerId = setInterval(countDown, 1000);
    moveEnemy();
    addListenerHitBox();
}

init();
