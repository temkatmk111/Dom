const startButton1 = document.getElementById("startButton");
const startButtonMain = document.getElementById("startButtonMain");
const startButtonSub = document.getElementById("startButtonSub");
const startButtonIcon = document.getElementById("startButtonIcon");
const lastAttemptScore = document.getElementById("lastAttemptScore");
const bestAttemptScore = document.getElementById("bestAttemptScore");

let startTime = 0;
let timerTimeout = null;
let gameState = "idle";
let bestScore = Infinity;

const LOADER_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F4F4F5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader spin">
      <line x1="12" y1="2" x2="12" y2="6"></line>
      <line x1="12" y1="18" x2="12" y2="22"></line>
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
      <line x1="2" y1="12" x2="6" y2="12"></line>
      <line x1="18" y1="12" x2="22" y2="12"></line>
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
  </svg>
`;

const ALERT_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-alert preview-icon">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" x2="12" y1="8" y2="12"/>
      <line x1="12" x2="12.01" y1="16" y2="16"/>
  </svg>
`;

const CHECK_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check preview-icon"><path d="M20 6 9 17l-5-5"/></svg>
`;

function startGame() {
  gameState = "waiting";

  startButton1.style.backgroundColor = "#4d0013";
  startButton1.style.border = "none";
  
  startButtonMain.textContent = "Wait for green";
  startButtonMain.style.color = "#F4F4F5";
  startButtonSub.textContent = "Not yet. Stay ready";
  startButtonSub.style.color = "#F4F4F5";
  
  startButtonIcon.innerHTML = LOADER_ICON;
  startButtonIcon.style.color = "#F4F4F5";

  const randomDelay = 2000 + Math.random() * 3000;

  timerTimeout = setTimeout(() => {
    gameState = "ready";
    startTime = performance.now();
    
    startButton1.style.backgroundColor = "#E7FF9E";
    startButton1.style.border = "none";
    
    startButtonMain.textContent = "Click now!";
    startButtonMain.style.color = "#27272A";
    startButtonSub.textContent = "Go, go, go!";
    startButtonSub.style.color = "#27272A";
    
    startButtonIcon.innerHTML = ALERT_ICON;
    startButtonIcon.style.color = "#27272A";
  }, randomDelay);
}

function handleTooEarly() {
  clearTimeout(timerTimeout);
  gameState = "result";

  startButton1.style.backgroundColor = "#27272A";
  startButton1.style.border = "none";
  
  startButtonMain.textContent = "Too soon!";
  startButtonMain.style.color = "#F4F4F5";
  startButtonSub.textContent = "Click to try again";
  startButtonSub.style.color = "#A1A1AA";
  
  // Kept original alert icon for too early state
  startButtonIcon.innerHTML = ALERT_ICON;
  startButtonIcon.style.color = "#F4F4F5";
}

function handleReaction() {
  const endTime = performance.now();
  const reactionTime = Math.round(endTime - startTime);
  gameState = "result";

  if (lastAttemptScore) {
    lastAttemptScore.textContent = `${reactionTime}ms`;
    lastAttemptScore.style.color = "#D9F99D";
    lastAttemptScore.style.border =  width = "0px";
  }

  if (reactionTime < bestScore) {
    bestScore = reactionTime;
    if (bestAttemptScore) {
      bestAttemptScore.textContent = `${bestScore}ms`;
      bestAttemptScore.style.color = "#D9F99D";
      bestAttemptScore.style.border = "none";
    }
  }

  startButton1.style.backgroundColor = "#27272A";
  startButton1.style.border = "2px solid #E7FF9E"; 
  
  startButtonMain.textContent = `${reactionTime}ms`;
  startButtonMain.style.color = "#F4F4F5";
  startButtonSub.textContent = "Click to play again";
  startButtonSub.style.color = "#A1A1AA";
  
  // Check icon appears here on successful reaction
  startButtonIcon.innerHTML = CHECK_ICON;
  startButtonIcon.style.color = "#E7FF9E";
}

startButton1.addEventListener("click", () => {
  if (gameState === "idle" || gameState === "result") {
    startGame();
  } else if (gameState === "waiting") {
    handleTooEarly();
  } else if (gameState === "ready") {
    handleReaction();
  }
});