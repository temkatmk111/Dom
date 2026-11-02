const markers = document.getElementById("Markers");
const numbers = document.getElementById("Numbers");
const hours = document.getElementById("Hours");
const minutes = document.getElementById("Minutes");
const seconds = document.getElementById("Seconds");

for (let i = 0; i < 60; i++) {
  const mark = document.createElement("div");
  mark.className = "absolute inset-0";
  mark.style.transform = `rotate(${i * 6}deg)`;
  const tick = document.createElement("span");
  const tickType =
    i % 5 === 0
      ? "w-0.5 h-3 bg-gray-600 rounded-full"
      : "w-px h-1.5 bg-gray-400 rounded-full";

  tick.className = `absolute top-2.5 left-1/2 -translate-x-1/2 size-3 ${tickType}`;
  mark.appendChild(tick);
  markers.appendChild(mark);
}

for (let i = 1; i <= 12; i++) {
  const number = document.createElement("span");
  const angle = (i * Math.PI) / 6;
  number.textContent = i;
  number.className =
    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ";
  number.style.left = `${50 + 39 * Math.sin(angle)}%`;
  number.style.top = `${50 - 39 * Math.cos(angle)}%`;
  numbers.appendChild(number);
}
const runtime = () => {
  const now = new Date();

  const ms = now.getMilliseconds();
  const second = now.getSeconds() + ms / 1000;
  const minute = now.getMinutes() + second / 60;
  const hour = now.getHours() + minute / 60;
  hours.style.transform = `rotate(${(hour % 12) * 30}deg)`;
  minutes.style.transform = `rotate(${minute * 6}deg)`;
  seconds.style.transform = `rotate(${second * 6}deg)`;

  requestAnimationFrame(runtime);
};

runtime();
