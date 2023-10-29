const body = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let intervalId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

stopBtn.setAttribute('disabled', '');

startBtn.addEventListener('click', (event) => {
  event.target.setAttribute('disabled', '');
  stopBtn.removeAttribute('disabled');

  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', (event) => {
  event.target.setAttribute('disabled', '');
  startBtn.removeAttribute('disabled');

  clearInterval(intervalId);
});