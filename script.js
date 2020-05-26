const timer = document.getElementById('timer');
const sessionLength = document.getElementById('session-length');
const breakLength = document.getElementById('break-length');

const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');
const statusDisplay = document.getElementById('status');
const configEntries = document.querySelectorAll('.config');

let targetTime;
let timeLeft;
let state = 'Standby';
let countdown;
let ndebug;

startButton.onclick = start;
resetButton.onclick = reset;
pauseButton.onclick = pause;
stopButton.onclick = stop;

configEntries.forEach(configEntry => (configEntry.addEventListener('change', entryChange)));

function entryChange(e) {

    // Set upper and lower limits
    if (this.value > 99) {
        this.value = 99;
    } else if (this.value < 1) {
        this.value = 1;
    }
    
    if (state == 'Standby') {
        reset();
    }
}

function updateState(newState) {
    state = newState;
    statusDisplay.textContent = newState;
    console.log(state);
}

function stop() {
    if (state != 'Standby') {
        clearInterval(countdown);
        reset();
        updateState('Standby');
    }
}

function pause() {
    if (state == 'Standby' || state == 'Break Paused') {
        return;
    } 

    let currentTime = new Date().getTime();
    timeLeft = targetTime - currentTime;
    clearInterval(countdown);
    updateState( (state=='Running') ? 'Paused' : 'Break Paused');
}

function startCountdown () {
    countdown = setInterval(updateTimer, 1000);
}

function start() {
    if (state == 'Running' || state == 'Break') {
        return;
    } else if (state == 'Standby') {
        reset();
        const resetSound = new Audio('audio/bell-ring-01.mp3');
        resetSound.play();
    }  else {
        let currentTime = new Date().getTime();
        targetTime = currentTime + timeLeft;
    }

    updateState( (state=='Break Paused') ? 'Break' : 'Running');
    startCountdown();
}

function reset() {
    let currentTime = new Date().getTime();
    let target = state.includes('Break') ? breakLength : sessionLength;
    targetTime = currentTime + (target.value * 1000 * 60);
    updateTimer();

    if (state == 'Standby') {
        return;
    } else if (state == 'Running') {
        const resetSound = new Audio('audio/bell-ring-01.mp3');
        resetSound.play();
    } else {
        updateState('Standby');
        document.body.style.backgroundColor =  'rgba(49, 75, 190, 1)';
    } 
}

function updateTimer() {
    let currentTime = new Date().getTime();
    timeDifference = targetTime - currentTime;

    let s = Math.floor(timeDifference % (1000*60) / 1000);
    let m = Math.floor(timeDifference % (1000*60*60)/(1000*60));
    let h = Math.floor(timeDifference % (1000*60*60*60)/(1000*60*60));
    m += h*60;
 
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
    targetTime = currentTime + (breakLength.value * 1000 * 60);
    updateTimer();

    document.body.style.backgroundColor =  'rgba(49, 190, 75, 1)';

    startCountdown();
    updateState('Break');
}