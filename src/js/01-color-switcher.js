const body = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStop.setAttribute('disabled', '');

let intervalId = null;

const changeColor = () =>
  body.setAttribute('style', `background-color : ${getRandomHexColor()}`);

const startSwitcher = () => {
  btnStart.setAttribute('disabled', '');
  btnStop.removeAttribute('disabled');
  intervalId = setInterval(changeColor, 1000);
};

const stopSwitcher = () => {
  clearInterval(intervalId);
  btnStart.removeAttribute('disabled');
  btnStop.setAttribute('disabled', '');
};
btnStart.addEventListener('click', startSwitcher);
btnStop.addEventListener('click', stopSwitcher);
