const focusLengh = document.querySelector ("#focusLengh");
const focusRange = document.querySelector (".focusRange");

const breakLengh = document.querySelector ("#breakLengh");
const breakRange = document.querySelector (".breakRange");

const session = document.querySelector ("#session");

const minTime = document.querySelector ("#minutes");
const secTime = document.querySelector ("#seconds");

const btnStart = document.querySelector ("#start");
const btnPause = document.querySelector ("#pause");
const btnReset = document.querySelector ("#reset");


let duration = " minute";
let countTimerDown;
let paused = false;
let minute;
let seconds;

btnStart.addEventListener("click", start);
btnPause.addEventListener("click", pause);
btnReset.addEventListener("click", reset);

function sessionRanges() {
    focusLengh.innerHTML = focusRange.value;
    minTime.innerHTML =
        parseInt(focusRange.value) < 10
        ? "0" + focusRange.value
        : focusRange.value;
}
focusRange.addEventListener("mousemove",sessionRanges);

function breakRanges() {
    breakLengh.innerHTML = breakRange.value;
}
breakRange.addEventListener("mousemove",breakRanges);

function pause() {
    paused = true;
    clearInterval(countTimerDown);

    minutes = +minTime.innerHTML;
    seconds = +secTime.innerHTML;
    btnStart.disabled = false;
}

function reset() {
    clearInterval(countTimerDown);
    session.innerHTML = "Break";
    const current =
        parseInt(focusRange.value) < 10
        ? "0" + focusRange.value
        : focusRange.value;
        minTime.innerHTML = current;
        secTime.innerHTML = "00";
    paused = false;
    btnStart.disabled = false;
}

function start() {
    clearInterval(countTimerDown);
    isPressed = true;
    let sessionTime = parseInt(focusRange.value);

    if (paused === false) {
      timer(sessionTime * 60, session.innerHTML);
    } else {
        clearInterval(countTimerDown);
      timer(minutes * 60 + seconds, session.innerHTML);
    }
    btnStart.disabled = true;
}

const song = document.querySelector("#song");

function timer(seconds, type) {
    clearInterval(countTimerDown);
    const now = Date.now();
    const later = now + seconds * 1000;
    displayTime(seconds);
    countTimerDown = setInterval(() => {
        const secondsLeft = Math.round((later - Date.now()) / 1000);
            if (secondsLeft < 0) {
        clearInterval(countTimerDown);
        switch (type) {
                case "Focus":
            session.innerHTML = "Break";
            song.src = "beep-beep.mp3";
            timer(parseInt(breakRange.value * 60), "Break");
            break;
                case "Break":
            session.innerHTML = "Focus";
            song.src = "beeep.mp3";
            timer(parseInt(focusRange.value * 60), "Focus");
            break;
        }
        return;
    }
    displayTime(secondsLeft);
    }, 1000);
}

function displayTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const m = `${mins < 10 ? "0" : ""}${mins}`;
    const s = `${secs < 10 ? "0" : ""}${secs}`;

    minTime.innerHTML = m;
    secTime.innerHTML = s;

    document.session = `${m}:${s}`;
}

