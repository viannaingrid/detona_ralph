const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelectorAll(".menu-lives .vida"),
    },
    values: {
        timerId: null,
        countDownTimerId: null,
        gameVelocity: 800,
        hitPosition: null,
        result: 0,
        currentTime: 60,
        isPaused: false,
        pauseCount: 0, 
    },
};

function countDown() {
    if (!state.values.isPaused && state.view.timeLeft) {
        state.values.currentTime--;
        state.view.timeLeft.textContent = state.values.currentTime;

        if (state.values.currentTime <= 0) {
            pararAcao();
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
    if (state.view.squares && !state.values.isPaused) {
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
            if (square.id === state.values.hitPosition && !state.values.isPaused) {
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

const botaoIniciar = document.getElementById("botaoIniciar");
const botaoParar = document.getElementById("botaoParar");
const botaoPausar = document.getElementById("botaoPausar");

function iniciarAcao() {
    const mensagem = document.getElementById("mensagem");
    if (state.values.isPaused) {
        mensagem.textContent = "O Jogo Continua!";
        state.values.isPaused = false;
        moveEnemy();
        addListenerHitBox();
        if (!state.values.countDownTimerId) {
            state.values.countDownTimerId = setInterval(countDown, 1000);
        }
    } else {
        mensagem.textContent = "O Jogo Começou!";
        state.values.isPaused = false;
        state.values.currentTime = 60;

        if (!state.values.countDownTimerId) {
            state.values.countDownTimerId = setInterval(countDown, 1000);
            moveEnemy();
            addListenerHitBox();
        }
    }
}

function pararAcao() {
    clearInterval(state.values.countDownTimerId);
    clearInterval(state.values.timerId);
    state.values.countDownTimerId = null;
    state.values.timerId = null;

    state.values.isPaused = false;
    state.values.currentTime = 60;
    state.values.result = 0;

    if (state.view.score) state.view.score.textContent = state.values.result;
    if (state.view.timeLeft) state.view.timeLeft.textContent = state.values.currentTime;

    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = "O Jogo Parou!";
}

function pausarAcao() {
    const mensagem = document.getElementById("mensagem");

    if (state.values.pauseCount === 1) {
        state.values.isPaused = true;
        clearInterval(state.values.timerId);
        clearInterval(state.values.countDownTimerId);
        mensagem.textContent = "Jogo Pausado";
        state.values.pauseCount++;
    } else {
        state.values.isPaused = false;
        state.values.currentTime = 60;
        state.values.result = 0;

        if (state.view.score) state.view.score.textContent = state.values.result;
        if (state.view.timeLeft) state.view.timeLeft.textContent = state.values.currentTime;

        clearInterval(state.values.timerId);
        clearInterval(state.values.countDownTimerId);
        state.values.countDownTimerId = null;
        state.values.timerId = null;

        mensagem.textContent = "Jogo Reiniciado!";
        state.values.pauseCount = 0; 
    }
}

botaoIniciar.addEventListener("click", iniciarAcao);
botaoParar.addEventListener("click", pararAcao);
botaoPausar.addEventListener("click", pausarAcao);


const botao = document.getElementById("botao");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", () => {
    mensagem.style.display = "block";
    setTimeout(() => {
        mensagem.style.display = "none";
    }, 500);
});