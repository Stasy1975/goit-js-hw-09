import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const refs = {
  form: document.querySelector('form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"'),
  button: document.querySelector('button'),
};

refs.button.addEventListener('click', onPromise);
let delay = 0;
let step = 0;
let amount = 0;

function onPromise(e) {
  e.preventDefault();
  delay = Number(refs.delay.value);
  step = Number(refs.step.value);
  amount = Number(refs.amount.value);
  onResullts(delay, step, amount);
}

function onResullts(delay, step, amount) {
  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, delay + step * i)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
