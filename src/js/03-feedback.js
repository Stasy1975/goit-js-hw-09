// Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, в которых сохраняй текущие значения полей формы. Пусть ключом для хранилища будет строка "feedback-form-state".
// При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми.
// При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.
// Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. Для этого добавь в проект и используй библиотеку lodash.throttle.

import { throttle } from 'lodash';

const formRef = document.querySelector('.feedback-form');
const emailEl = formRef.querySelector('input[name="email"]');
const msgEl = formRef.querySelector('textarea[name="message"]');
const btnEl = formRef.querySelector('button[type="submit"]');

let currentFeedbackFormState = localStorage.getItem('feedback-form-state');
currentFeedbackFormState = currentFeedbackFormState
  ? JSON.parse(currentFeedbackFormState)
  : {};

btnEl.addEventListener('click', onSubmit);
formRef.addEventListener('input', throttle(fillForm, 500));

const onSubmit = e => {
  e.preventDefault();
  localStorage.removeItem('feedback-form-state');
  formRef.reset();
};

const fillForm = e => {
  currentFeedbackFormState[e.target.name] = e.target.value;

  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify(currentFeedbackFormState)
  );
};
