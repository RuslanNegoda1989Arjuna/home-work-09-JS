// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const ref = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

ref.btnStart.disabled = true;

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

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.onTick = onTick;
  }

  start() {
    ref.btnStart.disabled = true;
    ref.input.disabled = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedDateValue - currentTime;
      if (deltaTime > 0) {
        const timeToEnd = this.convertMs(deltaTime);
        this.onTick(timeToEnd);
      } else {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  addLeadingZero(value) {
    return String(value).padStart(2, 0);
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    // Remaining seconds
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }
}

const timer = new Timer({
  onTick: updateTimer,
});

ref.btnStart.addEventListener('click', timer.start.bind(timer));

function updateTimer({ days, hours, minutes, seconds }) {
  ref.days.textContent = `${days}`;
  ref.hours.textContent = `${hours}`;
  ref.minutes.textContent = `${minutes}`;
  ref.seconds.textContent = `${seconds}`;
}
