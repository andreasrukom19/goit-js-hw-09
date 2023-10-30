import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
let selectedDate;
let currentDate;
let intervalId;


startBtn.disabled = true;

flatpickr(inputDate, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onSelectDate(selectedDates[0]);
  },
})

function onSelectDate(date) {
  selectedDate = date.getTime();
  currentDate = Date.now();

  if (selectedDate < currentDate) {
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    startBtn.disabled = false;
    Notiflix.Notify.success('Press the start button');
  }
}

class CountdownTimer {
  constructor(selectDay, selectHours, selectMinutes, selectSeconds) {
    this.selectDay = selectDay;
    this.selectHours = selectHours;
    this.selectMinutes = selectMinutes;
    this.selectSeconds = selectSeconds;
  }

  start() {
    intervalId = setInterval(() => {
      currentDate = Date.now();
      selectedDate = new Date(inputDate.value).getTime();
      const diff = selectedDate - currentDate;
      this.onScoreboard(this.convertMs(diff));
      startBtn.disabled = true;
      inputDate.disabled = true;

      if (diff <= 1000) {
        this.stop();
        this.onScoreboard(this.convertMs(0));
        Notiflix.Notify.success('The countdown is over!');
      }
    }, 1000)
  }

  stop() {
    clearInterval(intervalId);
    inputDate.disabled = false;
    return;
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  }

  onScoreboard({ days, hours, minutes, seconds }) {
    this.selectDay.textContent = `${days}`;
    this.selectHours.textContent = `${hours}`;
    this.selectMinutes.textContent = `${minutes}`;
    this.selectSeconds.textContent = `${seconds}`;
  }
}

const timer = new CountdownTimer(dataDays, dataHours, dataMinutes, dataSeconds);

startBtn.addEventListener('click', () => {
  timer.start();
});