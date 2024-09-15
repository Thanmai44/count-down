document.addEventListener("DOMContentLoaded", () =>{
    const start = document.getElementById("start-countdown");
    const pause = document.getElementById("pause-countdown");
    const cancel = document.getElementById("cancel-countdown");
    const resume = document.getElementById("resume-countdown");
    let countdownTimer;
    let endTime;
    function updateDisplay(time) {
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);
        document.getElementById("days").textContent = days.toString().padStart(2, "0");
        document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
    }
    
    function resetDisplay(){
        document.getElementById("target-date").value = "";
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        start.disabled = false;
        pause.disabled = true;
        cancel.disabled = true;
        resume.disabled = true;
    }
    function startCountdown(duration, isResuming = false){
        if(!isResuming){
            endTime = Date.now() + duration;
        }
        countdownTimer = setInterval(() =>{
            const now = Date.now();
            const timeLeft = endTime - Date.now();
            if(timeLeft < 0){
                clearInterval(countdownTimer);
                displayMessage("Countdown has ended!");
                localStorage.removeItem("countdownTarget");
                resetDisplay();
                return;
            }updateDisplay(timeLeft);
            pause.disabled = false;
            cancel.disabled = false;
        }, 1000);
    }
    function displayMessage(message){
        document.getElementById("timer-display").textContent = message;
    }
    start.addEventListener("click", () =>{
        const targetDate = new Date(document.getElementById("target-date").value);
        const duration = targetDate - Date.now();
        if(duration < 0){
            displayMessage("Please select a future date and time.");
            return;
        }
        localStorage.setItem("countdownTarget", targetDate.getTime());
        startCountdown(duration, false);
    });
    pause.addEventListener("click", () =>{
        clearInterval(countdownTimer);
        pause.disabled = true;
        resume.disabled = false;
    });
    resume.addEventListener("click", () =>{
        startCountdown(endTime - Date.now(), true);
        resume.disabled = true;
    });
    cancel.addEventListener("click", () =>{
        clearInterval(countdownTimer);
        resetDisplay();
    });
        
})