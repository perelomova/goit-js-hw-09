const CHANGE_COLOR_DELAY = 1000;
let intervalId = null;
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.classList.add('start-btn');
stopBtn.classList.add('stop-btn');
stopBtn.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', onStartClick);

function onStartClick() {
  console.log("Start");
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, CHANGE_COLOR_DELAY);

  startBtn.disabled = true;
  stopBtn.disabled = false;
};

stopBtn.addEventListener('click', onStopClick);

function onStopClick() {
  console.log("Stop");

  clearInterval(intervalId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

