import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let timerId = null;
let userSelectedDate = null; 

refs.startBtn.setAttribute('disabled', true);

const options = {
  dateFormat: 'Y-m-d H:i',
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();
    checkDateValids();
    getTimerValues();
  },
};

flatpickr('#datetime-picker', options);

function checkDateValids() {
  if (userSelectedDate < options.defaultDate) {
    // alert('Please choose a date in the future');
    Notiflix.Notify.failure('Please choose a date in the future', {
    clickToClose: true,
    width: '400px',
    position: 'center-top',
  });
    return;
  }
  
  refs.startBtn.removeAttribute('disabled');
}

function getTimerValues() {
  const resultTime = userSelectedDate - new Date();
  const time = convertMs(resultTime);

  if (resultTime > 0) {
    updateClock(time);
    console.log(time);
  } 
}

function updateClock({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

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

const startTimer = () => {
  refs.input.disabled = true;
  timerId = setInterval(getTimerValues, 1000);
  refs.startBtn.textContent = 'Stop';
}

const stopTimer = () => {
  clearInterval(timerId);
  refs.startBtn.textContent = 'Start';
  timerId = 0;
}

const handleButtonClick = () => {
  if (timerId) {
    stopTimer();
  } else {
    startTimer();
  }
}

refs.startBtn.addEventListener('click', handleButtonClick);

