// Напиши скрипт, який після натискання кнопки «Start»,
// раз на секунду змінює колір фону < body > на випадкове значення,
// використовуючи інлайн стиль.Натисканням на кнопку «Stop»
// зміна кольору фону 'повинна зупинятися.

// УВАГА
// Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів.
// Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною(disabled).

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
// link to buttons Start & Stop

const ref = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  body: document.body,
};

let timerId = null;

ref.btnStart.addEventListener('click', onChangeColor);
ref.btnStop.addEventListener('click', onStopChangin);

ref.btnStop.disabled = true;

// Click btn Start & change color
function onChangeColor() {
  timerId = setInterval(() => {
    ref.body.style.background = getRandomHexColor();
    ref.btnStart.disabled = true;
    ref.btnStop.disabled = false;
  }, 1000);
}

// Stop btn  - changin color

function onStopChangin() {
  clearInterval(timerId);
  ref.btnStart.disabled = false;
  ref.btnStop.disabled = true;
}
