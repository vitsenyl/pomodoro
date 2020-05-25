const timer = document.getElementById('timer');
const sessionLength = document.getElementById('session-length');
const breakLength = document.getElementById('break-length');

const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');
const statusDisplay = document.getElementById('status')

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
    clearInterval(countdown);
    updateState('Standby');
    reset();
}

function pause() {
    if (state == 'Running') {
        let currentTime = new Date().getTime();
        timeLeft = targetTime - currentTime;
        clearInterval(countdown);
        updateState('Paused');
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
    }
    countdown = setInterval(updateTimer, 1000);
    updateState('Running');
}

function reset() {
    let currentTime = new Date().getTime();
    targetTime = currentTime + (sessionLength.textContent * 1000 * 60);
    updateTimer();
    if (state == 'Paused') {
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
        updateState('Break');
    } else {
        timer.textContent = `${m}:${s.toString().padStart(2,'0')}`;
    }
}
