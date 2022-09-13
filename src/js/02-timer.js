// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const ref = {
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

console.log(ref.btnStart);
ref.btnStart.disabled = true;

ref.btnStart.addEventListener('click', onStart);

function onStart() {
  timer.start();
}

let selectedDateValue = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDateValue = selectedDates[0].getTime();

    const date = new Date();
    const todayDateValue = date.getTime();

    // Якщо дата в майбутньому вмикаєм кнопку

    if (selectedDateValue > todayDateValue) {
      ref.btnStart.disabled = false;
    } else {
      ref.btnStart.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr('input#datetime-picker', options);

const timer = {
  intervalId: null,
  start() {
    ref.btnStart.disabled = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedDateValue - currentTime;
      if (deltaTime > 0) {
        const timeToEnd = convertMs(deltaTime);
        updateTimer(timeToEnd);
      } else {
        clearInterval(this.intervalId);
      }
    }, 1000);
  },
};

function updateTimer({ days, hours, minutes, seconds }) {
  ref.days.textContent = `${days}`;
  ref.hours.textContent = `${hours}`;
  ref.minutes.textContent = `${minutes}`;
  ref.seconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
