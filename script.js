const timer = document.getElementById('timer');
const sessionLength = document.getElementById('session-length');
const breakLength = document.getElementById('break-length');

const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');

let targetTime;
let timeLeft;
let state = 'standby';
let countdown;

startButton.onclick = start;
resetButton.onclick = reset;
pauseButton.onclick = pause;
stopButton.onclick = stop;
let s;

function stop() {
    clearInterval(countdown);
    state = 'standby';
}

function pause() {
    if (state == 'running') {
        let currentTime = new Date().getTime();
        timeLeft = targetTime - currentTime;
        clearInterval(countdown);
        state = 'paused'
    }
}

function start() {
    let currentTime = new Date().getTime();
    if (state == 'running') {
        return;
    } else if (state == 'paused') {
        targetTime = currentTime + timeLeft;
    } else if (state == 'standby') {
        reset();
    }
    countdown = setInterval(updateTimer, 1000);
    state = 'running';
}

function reset() {
    let currentTime = new Date().getTime();
    targetTime = currentTime + (sessionLength.textContent * 1000 * 60);
    updateTimer();
}

function updateTimer() {
    let currentTime = new Date().getTime();
    timeDifference = targetTime - currentTime;

    s = Math.floor(timeDifference % (1000*60) / 1000);
    m = Math.floor(timeDifference % (1000*60*60)/(1000*60));
 
    
    if (timeDifference <= 0) {
        clearInterval(countdown);
        timer.textContent = "Break Time";
        state = 'break';
    } else {
        timer.textContent = `${m}:${s.toString().padStart(2,'0')}`;
    }
}
