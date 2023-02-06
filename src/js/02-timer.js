import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  timerBtnStart: document.querySelector('[data-start]'),
  inputDateTime: document.querySelector('#datetime-picker'),
};

refs.timerBtnStart.addEventListener('click', onStartBtn);

let selectedTime = null;
refs.timerBtnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedTime = selectedDates[0];

    if (selectedTime.getTime() < Date.now()) {
      Notify.failure('Please choose a date in the future');
      refs.timerBtnStart.disabled = true;
    } else {
      refs.timerBtnStart.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

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
      const deltaTime = selectedTime - Date.now();
      const timeMs = convertMs(deltaTime);
      const { days, hours, minutes, seconds } = this.refs;
      days.textContent = addLeadingZero(timeMs.days);
      hours.textContent = addLeadingZero(timeMs.hours);
      minutes.textContent = addLeadingZero(timeMs.minutes);
      seconds.textContent = addLeadingZero(timeMs.seconds);
      if (deltaTime < 1000) {
        clearInterval(this.intervalId);
      }
    }, 1000);
  },
};

function onStartBtn() {
  timer.start();
  refs.timerBtnStart.disabled = true;
  refs.inputDateTime.disabled = true;
}

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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
