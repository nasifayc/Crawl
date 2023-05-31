document.querySelector('.js-start-button').addEventListener('click',()=>{
  startTimer();
});
document.querySelector('.js-pause-button').addEventListener('click',()=>{
  pauseTimer();
});
document.querySelector('.js-reset-button').addEventListener('click',()=>{
 resetTimer();
});
document.body.addEventListener('keydown',(event)=>{
  if(event.key === ' '){
    pauseTimer();
  }else if(event.key === 'Enter'){
    startTimer();
  }else if(event.key === 'Backspace'){
    resetTimer();
  }
})
const object =JSON.parse(localStorage.getItem('Timer')) || {
  minutes:0,
  seconds:0,
  miliSecond:0,
}
const timerElement = document.querySelector('.js-timer');
let intervalID;
renderTimer();

function startTimer(){
  clearInterval(intervalID);
  intervalID = setInterval(()=>{
    object.miliSecond++;
    if(object.miliSecond === 100){
      increaseSecond();
    }
    if(object.seconds === 60){
      increaseMinute();
    }
  renderTimer();
  saveTimer();},10);
}

function increaseMinute(){
  object.seconds = 0;
  object.minutes++;
};
function increaseSecond (){
  object.miliSecond = 0;
  object.seconds++;
};
function pauseTimer(){
  clearInterval(intervalID);
  renderTimer();
  saveTimer();
};
function resetTimer(){
  object.minutes = 0;
  object.seconds = 0;
  object.miliSecond = 0;
  localStorage.removeItem('Timer');
  renderTimer();
};
function renderTimer(){
  timerElement.innerHTML = `
    <div id="minute">${String(object.minutes).padStart(2,'0')}<p>m</p></div>
    <div id="second"> ${String(object.seconds).padStart(2,'0')}<p>s</p></div>
    <div id="miliSecond">${String(object.miliSecond).padStart(2,'0')}</div>`
};
function saveTimer(){
  localStorage.setItem('Timer',JSON.stringify(object));
};