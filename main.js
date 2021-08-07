// Generals
const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const startBtn = document.querySelector(".start");
const restartBtn = document.querySelector(".restart");
const Highscore = document.querySelector(".highscore");
let lastHole;
let timeUp = false;
let score = 0;
Highscore.textContent = localStorage.getItem("Highscore") || 0;
const device = navigator.userAgent;
if (device.includes("iPhone")) {
  startBtn.textContent = "";
  startBtn.textContent = "Tap here to start !!!";
}
// To disable when game is running
restartBtn.disabled = true;

// To generate random time
const randomTime = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

// To generate random hole from holes
const randomHole = function (holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];

  if (hole === lastHole) {
    return randomHole(holes);
  }

  lastHole = hole;
  return hole;
};

// To add or remove up class when timeUp
const peep = function () {
  const time = randomTime(300, 1000);
  const hole = randomHole(holes);
  hole.classList.add("up");

  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
};

// Logic to start or restart game
const app = function () {
  Highscore.textContent = localStorage.getItem("Highscore") || 0;
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  setTimeout(() => {
    timeUp = true;
    restartBtn.disabled = false;
  }, 30000);
  peep();
};

// To start game
const startGame = function (e) {
  if (e.target.classList.contains("social")) return;
  startBtn.style.display = "none";
  restartBtn.style.display = "block";
  app();
};

// To restart game
const restartGame = function () {
  restartBtn.disabled = true;
  app();
};

// To update the scores
const maintainScore = function (e) {
  if (!e.isTrusted) return;
  score++;
  this.parentNode.classList.remove("up");
  scoreBoard.textContent = score;
  if (score < +Highscore.textContent) return;
  localStorage.setItem("Highscore", score);
};

// Event Handler
device.includes("iPhone")
  ? startBtn.addEventListener("click", startGame, {
      once: true,
    })
  : window.addEventListener("click", startGame, {
      once: true,
    });
restartBtn.addEventListener("click", restartGame);
moles.forEach((mole) => mole.addEventListener("click", maintainScore));
