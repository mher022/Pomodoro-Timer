let minutes = 25; // Default work time
let seconds = 0;   // Default seconds count
let isWorkSession = true; // Flag to track if it’s work or break time
let timerInterval; // Store the interval for timer updates

// Function to start the timer
function startTimer() {
    // Clear the existing interval if it's already running
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    // Get the custom work time from the slider and reset seconds to 0
    minutes = parseInt(document.getElementById("work-time-slider").value) || 25;
    seconds = 0;  // Reset seconds to 0 when starting

    timerInterval = setInterval(() => {
        if (seconds === 0 && minutes === 0) {
            switchSession(); // Switch between work and break time
        } else if (seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        updateDisplay(); // Update the displayed time
    }, 1000);

    // Change the timer to running state and add pulsing effect
    document.getElementById("timer-display").classList.add("timer-running");
    document.getElementById("timer-display").classList.remove("timer-paused");
    document.getElementById("timer-display").classList.add("pulse");
}


// Function to switch between work and break sessions
function switchSession() {
    isWorkSession = !isWorkSession;
    minutes = isWorkSession ? parseInt(document.getElementById("work-time-slider").value) || 25 : 5; // Work = user time, Break = 5 minutes
    seconds = 0;
    updateDisplay(); // Update the session type and time display
}

// Function to update the displayed time and session type
function updateDisplay() {
    const display = document.getElementById("timer-display");
    display.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    
    const sessionType = document.getElementById("session-type");
    sessionType.textContent = isWorkSession ? "Work Time" : "Break Time";
}

// Function to pause the timer
function pauseTimer() {
    clearInterval(timerInterval);

    // Change the timer to paused state
    document.getElementById("timer-display").classList.remove("timer-running");
    document.getElementById("timer-display").classList.add("timer-paused");
    document.getElementById("timer-display").classList.remove("pulse");
}

// Function to reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    minutes = parseInt(document.getElementById("work-time-slider").value) || 25;
    seconds = 0;
    updateDisplay(); // Reset the display to the initial state

    // Reset the timer to paused state
    document.getElementById("timer-display").classList.remove("timer-running");
    document.getElementById("timer-display").classList.add("timer-paused");
    document.getElementById("timer-display").classList.remove("pulse");
}

// Update the slider value dynamically as the user moves the slider
document.getElementById("work-time-slider").addEventListener("input", function () {
    const sliderValue = document.getElementById("work-time-slider").value;
    document.getElementById("slider-value").textContent = sliderValue;
});

// Event listeners for the buttons
document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
