import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

const refs = {
  form: document.querySelector('form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"'),
  button: document.querySelector('button'),
};

refs.button.addEventListener('click', onPromise);

function onPromise(e) {
  e.preventDefault();
  const delay = refs.delay.value;
  const step = refs.step.value;
  const amount = refs.amount.value;
  onResullts(delay, step, amount);
}

function onResullts(delay, step, amount) {
  for (let i = 0; i < amount; i += 1) {
    createPromise(i, delay + step * i)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
