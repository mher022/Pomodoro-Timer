let isRunning = false;
let isWorkMode = true; // Start in Work mode
let timer;
let timeLeft = 25 * 60; // 25 minutes for work

const timerDisplay = document.getElementById("timer-display");
const timerStatus = document.getElementById("timer-status");
const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const resetButton = document.getElementById("reset-button");
const workButton = document.getElementById("work-button");
const breakButton = document.getElementById("break-button");

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
    if (isRunning) return; // If timer is already running, don't start it again
    isRunning = true;
    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = false;

    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            isRunning = false;
            startButton.disabled = false;
            pauseButton.disabled = true;
            resetButton.disabled = false;
            alert(isWorkMode ? "Time for a break!" : "Time to work!");
            switchMode(isWorkMode ? "break" : "work");
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = isWorkMode ? 25 * 60 : 5 * 60; // Reset to either 25 mins work or 5 mins break
    updateTimerDisplay();
    timerStatus.textContent = isWorkMode ? "Work" : "Break";
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
}

function switchMode(mode) {
    if (isRunning) return; // Prevent switching modes while timer is running
    isWorkMode = (mode === "work");
    timeLeft = isWorkMode ? 25 * 60 : 5 * 60;
    updateTimerDisplay();
    timerStatus.textContent = isWorkMode ? "Work" : "Break";

    // Update toggle button styling
    if (isWorkMode) {
        workButton.classList.add("active");
        breakButton.classList.remove("active");
    } else {
        breakButton.classList.add("active");
        workButton.classList.remove("active");
    }
}

workButton.addEventListener("click", () => switchMode("work"));
breakButton.addEventListener("click", () => switchMode("break"));
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

updateTimerDisplay();
        