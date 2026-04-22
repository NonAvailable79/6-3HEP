// GLOBAL STATE
// time left, mode, running, current toy
const state = {
    timeLeft: 25 * 60,
    mode: "focus",
    isRunning: false,
    currentToy: "none"
};

// set constant for elements
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn'); 
const resetBtn = document.getElementById('reset-btn'); 
const workInput = document.getElementById('work-input'); 
const breakInput = document.getElementById('break-input'); 

// STEP 2: TIMER LOGIC
// update display 
// start/stop/reset timer 

state.timeLeft = workInput.value * 60;
function startTimer() {
    if (!isRunning) { 
        // If starting fresh or resuming...
        isRunning = true; 
        startBtn.textContent = 'Pause'; 

        timerInterval = setInterval(() => {  // do this block of ahh at a repeated interval
            timeLeft--; 
            if (timeLeft < 0.0166) { 
                isBreak = !state.mode; // switch mode
                timeLeft = (state.mode === "break" ? breakInput.value : workInput.value) * 60; 
                // depending on the mode, get minutes for next mode
                statusDisplay.textContent = isBreak ? "Break" : "Focus"; 
                //document.body.classList.toggle('break-mode', isBreak); 
                playSound(isBreak); 
            }                    
            updateDisplay(); 
        }, 1000); //every second
    } 
    else { 
        clearInterval(timerInterval); //stop whatever the timer doing
        isRunning = false; 
        startBtn.textContent = 'Resume'; 
    }
}

function resetTimer() {
    clearInterval(timerInterval); //stop the timer
    state.isRunning = false; 
    state.mode = "focus"; 
    state.timeLeft = workInput.value * 60; //get new time value

    statusDisplay.textContent = "Focus"; 
    startBtn.textContent = "Start"; 
    //document.body.classList.remove('break-mode'); 
    stopParticles(); 
    updateDisplay(); 
}


// CANVAS SETUP
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();


// =========================
// STEP 4: TOY SYSTEM
// =========================
// TODO:
// store the toy behaviour in dormant objects (why not)
const toys = {
    bubbles: {
        update() {},
        draw() {},
        click(e) {}
    }
};


// =========================
// STEP 5: INTERACTIONS
// =========================
// TODO:
// - Different behavior for focus vs break
// - Use state.mode to decide
canvas.addEventListener('click', (e) => {
    // call current toy click
});

canvas.addEventListener('mousemove', (e) => {
    // optional drag behavior
});


// =========================
// STEP 6: RENDER LOOP
// =========================
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // TODO:
    // - Update current toy (only if it's break)
    // - Draw current toy (only if it's break)
    // check what is available to you

    requestAnimationFrame(loop); // ask the page to update this
}

loop();


// =========================
// STEP 7: TIMER DISPLAY MODES
// =========================
// TODO:
// Create functions:
// drawRingTimer()
// drawBarTimer()
// drawHourglassTimer()


// =========================
// STEP 8: REWARD SYSTEM
// =========================
// TODO:
// - Track completed sessions
// - Unlock new toys


// =========================
// STEP 9: SOUND
// =========================
// TODO:
// - playFocusStart()
// - playWarning()


// make the buttons trigger stuff
document.getElementById('start').onclick = startTimer;
document.getElementById('reset').onclick = resetTimer;
