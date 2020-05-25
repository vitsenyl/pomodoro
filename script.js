const timer = document.getElementById('timer');
const sessionLength = document.getElementById('session-length');
const breakLength = document.getElementById('break-length');

const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');
const statusDisplay = document.getElementById('status');



let targetTime;
let timeLeft;
let state = 'Standby';
let countdown;

startButton.onclick = start;
resetButton.onclick = reset;
pauseButton.onclick = pause;
stopButton.onclick = stop;

function updateState(newState) {
    state = newState;
    statusDisplay.textContent = newState;
}

function stop() {
    if (state != 'Standby') {
        clearInterval(countdown);
        updateState('Standby');
        reset();
    }
}

function pause() {
    if (state == 'Running') {
        let currentTime = new Date().getTime();
        timeLeft = targetTime - currentTime;
        clearInterval(countdown);
        updateState('Paused');
    } else if (state == 'Break') {

    }
}

function start() {
    let currentTime = new Date().getTime();
    if (state == 'Running') {
        return;
    } else if (state == 'Paused') {
        targetTime = currentTime + timeLeft;
    } else if (state == 'Standby') {
        reset();
        const resetSound = new Audio('audio/bell-ring-01.mp3');
        resetSound.play();
    }
    countdown = setInterval(updateTimer, 1000);
    updateState('Running');
}

function reset() {
    let currentTime = new Date().getTime();
    targetTime = currentTime + (sessionLength.textContent * 1000 * 60);
    updateTimer();

    if (state == 'Running') {
        const resetSound = new Audio('audio/bell-ring-01.mp3');
        resetSound.play();
    }
    if (state == 'Paused' || state == 'Break') {
        updateState('Standby');
    } 
}

function updateTimer() {
    let currentTime = new Date().getTime();
    timeDifference = targetTime - currentTime;

    s = Math.floor(timeDifference % (1000*60) / 1000);
    m = Math.floor(timeDifference % (1000*60*60)/(1000*60));
 
    
    if (timeDifference <= 0) {
        clearInterval(countdown);
        if (state == 'Running') {
            startBreak();
        } else if (state == 'Break') {
            reset();
        }    
        const breakSound = new Audio('audio/bell-ringing-04.mp3');
        breakSound.play();
    } else {
        timer.textContent = `${m}:${s.toString().padStart(2,'0')}`;
    }
}

function startBreak() {
    let currentTime = new Date().getTime();
    targetTime = currentTime + (breakLength.textContent * 1000 * 60);
    updateTimer();

    countdown = setInterval(updateTimer, 1000);
    updateState('Break');
}
