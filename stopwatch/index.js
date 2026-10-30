const Ready = document.getElementById("Ready");
const HoursP = document.getElementById("Hours");
const MinutesP = document.getElementById("Minutes");
const SecondsP = document.getElementById("Seconds");
const StartP = document.getElementById("Start");
const PauseP = document.getElementById("Pause");
const ResetP = document.getElementById("Reset");

let intervalID;
let StartTime = 0;

const FromatTime = (StartTime) => {
  const seconds = Math.floor(StartTime % 60)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((StartTime % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const hours = Math.floor(StartTime / 3600)
    .toString()
    .padStart(2, "0");

  SecondsP.textContent = seconds;
  MinutesP.textContent = minutes;
  HoursP.textContent = hours;
};
const StartJS = () => {
  intervalID = setInterval(() => {
    StartTime = StartTime + 1;
      FromatTime(StartTime);
  }, 1000);

  PauseP.disabled = false;
  ResetP.disabled = false;
  StartP.disabled = true;
  Ready.textContent = "Runnig";
};

const PauseJS = () => {
  clearInterval(intervalID);
  PauseP.disabled = true;
  ResetP.disabled = false;
  StartP.disabled = false;
  StartP.textContent = "Resume";
  Ready.textContent = "Paused";
};

const ResetJS = () => {
  clearInterval(intervalID);
  StartTime = 0
  FromatTime(StartTime);
  PauseP.disabled = true;
  ResetP.disabled = true;
  StartP.disabled = false;
  Ready.textContent = "Ready";
  StartP.textContent = "Start";
};

StartP.addEventListener("click", StartJS);
PauseP.addEventListener("click", PauseJS);
ResetP.addEventListener("click", ResetJS);
