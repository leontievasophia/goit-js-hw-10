
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



const input = document.querySelector('#datetime-picker');
const start = document.querySelector('[data-start]');

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

start.disabled=true;
let userSelectedDate = null;
let timerId = null;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    const currentDate = new Date();
    const diff = userSelectedDate - currentDate;

    if (diff <= 0) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });

      start.disabled = true;
      return;
    }

    start.disabled = false;
  },
};

flatpickr(input, options);


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
};

let intervalId=null;
start.addEventListener('click', ()=>{
  start.disabled = true;
  input.disabled = true;
  
  intervalId=setInterval(()=>{
    const currentDate= new Date();
    const diff=userSelectedDate-currentDate;

    const time = convertMs(diff);

    if(diff<=0){
      clearInterval(intervalId);

      days.textContent='00';
      hours.textContent='00';
      minutes.textContent='00';
      seconds.textContent='00';

        start.disabled = true;
        input.disabled = false;
        return;
    }

    days.textContent=addLeadingZero(time.days);
    hours.textContent=addLeadingZero(time.hours);
    minutes.textContent=addLeadingZero(time.minutes);
    seconds.textContent=addLeadingZero(time.seconds);



  }, 1000);
});