import { Notify } from 'notiflix/build/notiflix-notify-aio';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const startRef = document.querySelector('[data-start]');
const inputRef = document.querySelector('#datetime-picker');
startRef.disabled = true;
let timerDeadline = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timerDeadline = selectedDates[0].getTime();
    if (timerDeadline < Date.now()) {
      Notify.warning('Please choose a date in the future');
      startRef.disabled = true;
    } else {
      startRef.disabled = false;
    }
  },
};

flatpickr(inputRef, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

const timer = {
  intervalId: null,
  refs: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },
  start() {
    this.intervalId = setInterval(() => {
      const deltaTime = timerDeadline - Date.now();
      const timeMs = convertMs(deltaTime);
      const { days, hours, minutes, seconds } = this.refs;
      days.textContent = pad(timeMs.days);
      hours.textContent = pad(timeMs.hours);
      minutes.textContent = pad(timeMs.minutes);
      seconds.textContent = pad(timeMs.seconds);
      if (deltaTime < 1000) {
        clearInterval(this.intervalId);
      }
    }, 1000);
  },
};

startRef.addEventListener('click', timer.start.bind(timer));
