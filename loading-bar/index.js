const too = document.getElementById("too");
const ug = document.getElementById("ug");
const huwi = document.getElementById("huwi");
let startT = null;
const LOADING_DURATION_MS = 5000;
const messages = [
  "Preparing your space",
  "Bringing everything together",
  "Adding the finishing touches",
  "All set. Welcome in!",
];

const renderP = (percentage) => {
  const roundedpercentage = Math.floor(percentage);
  const currentug = roundedpercentage >=100  ? 3 : roundedpercentage >= 80? 2:roundedpercentage >=35 ? 1: 0;
  too.textContent = roundedpercentage;
  ug.textContent = messages[currentug]
  huwi.style.width =  `${roundedpercentage}%`
};
const updateP = (timestamp) => {
  if (!startT) startT = timestamp;

  const percentage = Math.min(
    ((timestamp - startT) / LOADING_DURATION_MS) * 100,
    100,
  );
  renderP(percentage);
  if (percentage <= 100) {
    requestAnimationFrame(updateP);
  }
};

requestAnimationFrame(updateP);
