const timer = document.getElementById('timer');
const sessionLength = document.getElementById('session-length');
const breakLength = document.getElementById('break-length');
const configEntries = document.querySelectorAll('.config');
const autoStart = document.querySelector('#auto-repeat');

const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');
const statusDisplay = document.getElementById('status');


// Audio from https://www.soundjay.com/bell-sound-effect.html
const resetSound = new Audio('audio/bell-ring-01.mp3');
const breakSound = new Audio('audio/bell-ringing-04.mp3');

let targetTime;
let timeLeft;
let state = 'Standby';
let countdown;

// Initializing Callbacks

startButton.onclick = start;
resetButton.onclick = reset;
pauseButton.onclick = pause;
stopButton.onclick = stop;
sessionLength.addEventListener('change', checkBounds);
breakLength.addEventListener('change', checkBounds);

reset();
//Utility functions

function updateState(newState) {
    state = newState;
    statusDisplay.textContent = newState;
    console.log(state);
}

function startCountdown () {
    countdown = setInterval(updateTimer, 1000);
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
            if (autoStart.value == "on") {
                reset();
                start();
                return;              
            }
            reset();
        }    
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

// Callback Functions

function checkBounds(e) {
    // Set upper and lower limits
    if (this.value > 99) {
        this.value = 99;
    } else if (this.value < 0.1) {
        this.value = 1;
    }
    
    if (state == 'Standby') {
        reset();
    }
}

function start() {
    if (state == 'Running' || state == 'Break') {
        return;
    } else if (state == 'Standby') {
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
    targetTime = currentTime + (sessionLength.value * 1000 * 60);
    updateTimer();

    if (state == 'Standby') {
        return;
    } else if (state == 'Running') {
        resetSound.play();
    } else {        
        updateState('Standby');
        document.body.style.backgroundColor =  'rgba(49, 75, 190, 1)';
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

function stop() {
    if (state != 'Standby') {
        clearInterval(countdown);
        reset();
        updateState('Standby');
    }
}