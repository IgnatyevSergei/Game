const startBtn = document.getElementById("start");
const cards = document.querySelectorAll(".card");
const timeController = document.getElementById("time-list");
const timeEl = document.getElementById("time");
const boardEl = document.getElementById("board");
const modalBtn = document.querySelectorAll(".modal-window__btn");

let time = 0;
let score = 0;
let idSetInterval = null;
newTime = 0;

startBtn.addEventListener("click", handlerStartBtn);

function handlerStartBtn(e) {
  e.preventDefault();
  cards[0].classList.add("up");
}

timeController.addEventListener("click", handelTimeController);

function handelTimeController(e) {
  if (e.target.classList.contains("time-list__button")) {
    cards[1].classList.add("up");
    time = parseInt(e.target.dataset.time);
    newTime = parseInt(e.target.dataset.time);
    startGame();
  }
}

boardEl.addEventListener("click", handelCircleClick);

function handelCircleClick(e) {
  if (e.target.classList.contains("circle")) {
    score++;
    e.target.remove();
    createRandomCircle();
  }
}

function createRandomCircle() {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  const size = getRandomNum(5, 50);
  const { width, height } = boardEl.getBoundingClientRect();
  circle.style.width = circle.style.height = size + "px";
  // circle.style.background = '#fff'
  circle.style.background = randomColor();
  const x = getRandomNum(0, width - size);
  const y = getRandomNum(0, height - size);
  circle.style.left = x + "px";
  circle.style.top = y + "px";
  boardEl.append(circle);
}
function randomColor() {
  return `rgb(${getRandomNum(0, 255)}, ${getRandomNum(0, 255)}, ${getRandomNum(
    0,
    255
  )}`;
}

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function setTime(timeGame) {
  timeEl.innerHTML = `00:${timeGame} `;
}

function startGame() {
  idSetInterval = setInterval(decTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }

    setTime(current);
  }
}

function finishGame() {
  timeEl.parentNode.style.display = "none";
  clearInterval(idSetInterval);
  boardEl.innerHTML = `<p>Ваш счет: ${score}</p>`;
  setTimeout(addModalWindow, 3000);
}

function addModalWindow() {
  cards[2].classList.add("up");
}

modalBtn.forEach((btn) => {
  btn.addEventListener("click", action);
});

function action(e) {
  if (e.target.dataset.action === "start") {
    cards[2].classList.remove("up");
    removeOptions();
    startGame();
  } else if (e.target.dataset.action === "end") {
    removeOptions();
    cards.forEach((el) => el.classList.remove("up"));
  }
}

function removeOptions() {
  time = newTime;
  score = 0;
  timeEl.parentNode.style.display = "initial";
  boardEl.innerHTML = "";
}
