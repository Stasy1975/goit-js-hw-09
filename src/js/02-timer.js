import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';

let selectedDate = null;
let nowDate = null;
let intervalId = null;

const startEl = document.querySelector('[data-start]');
startEl.setAttribute('disabled', '');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const onClose = selectedDates => {
  nowDate = new Date();
  console.log(nowDate);
  selectedDate = selectedDates[0];
  console.log(selectedDate);
  if (nowDate > selectedDate) {
    return Notify.failure('Please choose a date in the future.');
  }
  startEl.removeAttribute('disabled');
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
};

flatpickr('#datetime-picker', options);

const onStart = () => {
  startEl.setAttribute('disabled', '');
  let nowTime = null;
  let countDown = null;
  const stopTime = selectedDate.getTime();
  //   console.log(stopTime);

  intervalId = setInterval(() => {
    nowTime = Date.now();
    if (stopTime < nowTime) {
      stopCountdown();
      return;
    }
    countDown = convertMs(stopTime - nowTime);
    daysEl.textContent = addLeadingZero(countDown.days);
    hoursEl.textContent = addLeadingZero(countDown.hours);
    minutesEl.textContent = addLeadingZero(countDown.minutes);
    secondsEl.textContent = addLeadingZero(countDown.seconds);
  }, 1000);
  console.log();
};

const stopCountdown = () => {
  clearInterval(intervalId);
  btnStartEl.removeAttribute('disabled');
};

startEl.addEventListener('click', onStart);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
