const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};
const DELAY = 1000;
let timeoutId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.startBtn.addEventListener('click', onStartChangeColor);
refs.stopBtn.addEventListener('click', onStopChangeColor);

function onStartChangeColor() {
  timeoutId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, DELAY);
  refs.startBtn.disabled = true;
}

function onStopChangeColor() {
  refs.startBtn.disabled = false;
  clearInterval(timeoutId);
}
