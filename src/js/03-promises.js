import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

refs.form.addEventListener('submit', onSubmit);

// Напиши скрипт, який на момент сабміту форми викликає функцію
// createPromise(position, delay) стільки разів, скільки ввели в
// поле amount.Під час кожного виклику передай їй номер промісу(position),
// що створюється, і затримку, враховуючи першу затримку(delay),
// введену користувачем, і крок(step).

function onSubmit(evt) {
  evt.preventDefault();
  let { delay, step, amount } = getData();
  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
}

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

function getData() {
  return {
    delay: Number(refs.delay.value),
    step: Number(refs.step.value),
    amount: Number(refs.amount.value),
  };
}
