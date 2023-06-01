let score = JSON.parse(localStorage.getItem('score')) || {Wins : 0, Losses : 0, Ties : 0};
updateScoreElement();
let isAutoPlay = false;
let intervalID;

function autoPlay(){
  if(!isAutoPlay){
    intervalID = setInterval(()=>{
    const playerMove = pickComputerMove();
    playGame(playerMove);
  },1000);
  document.querySelector('.js-autoPlay').innerHTML = 'Stop Play';
  isAutoPlay = true;
  }else{
    clearInterval(intervalID);
    document.querySelector('.js-autoPlay').innerHTML = 'Auto Play';
    isAutoPlay = false;
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click',()=>{
    playGame('Rock');
  });
document.querySelector('.js-paper-button')
  .addEventListener('click',()=>{
    playGame('Paper');
  });
document.querySelector('.js-scissor-button')
  .addEventListener('click',()=>{
    playGame('Scissors');
  });
document.querySelector('.resetbutton')
  .addEventListener('click',()=>{
    resetScoreConfirmation();
});
document.querySelector('.js-autoPlay')
  .addEventListener('click',()=>{
    autoPlay();
  });
document.body.addEventListener('keydown',(event)=>{
  if(event.key === 'r'){
    playGame('Rock');
    hideResetConfirmation();
  }else if(event.key === 'p'){
    playGame('Paper');
    hideResetConfirmation();
  }else if(event.key === 's'){
    playGame('Scissors');
    hideResetConfirmation();
  }else if(event.key === 'a'){
    autoPlay();
    hideResetConfirmation();
  }else if(event.key === 'Backspace'){
    resetScoreConfirmation();
  }else{
    hideResetConfirmation()
  }
})
      
function playGame(playerMove){
    const computerMove = pickComputerMove();
    result = '';
    if(playerMove === 'Scissors')
    {
      if(computerMove === 'Rock'){
        result = 'You Lose!';}
      else if(computerMove === 'Paper'){
        result = 'You Win!';}
      else if(computerMove ==='Scissors'){
        result = 'Tie!';}
    }
    else if(playerMove === 'Paper')
    {
      if(computerMove === 'Rock')
      {
        result = 'You Win!';}
      else if(computerMove === 'Paper')
      {
        result = 'Tie!';}
      else if(computerMove ==='Scissors'){
        result = 'You Lose!';}
    }
    else if(playerMove === 'Rock')
    {
      if(computerMove === 'Rock'){
        result = 'Tie!';}
      else if(computerMove === 'Paper'){
        result = 'You Lose!';}
      else if(computerMove ==='Scissors'){
        result = 'You Win!';}
    }
    if(result === 'You Win!'){score.Wins++;}
    else if(result === 'You Lose!') {score.Losses++;}
    else if(result === 'Tie!') {score.Ties++;}

    localStorage.setItem('score',JSON.stringify(score));
    updateScoreElement();
    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You <img src="icons/${playerMove}-emoji.png" class="icons"> <img src="icons/${computerMove}-emoji.png" class="icons"> Computer`;
    }
  
function updateScoreElement(){
    document.querySelector('.js-score').innerHTML = `Wins:${score.Wins} Losses: ${score.Losses} Ties: ${score.Ties}`
}
      
function pickComputerMove(){
    const randomNumber = Math.random();
    let computerMove = '';
    if(randomNumber>=0 && randomNumber <(1/3))
    {
      computerMove = 'Rock';
    }
    else if(randomNumber>=(1/3) && randomNumber <(2/3))
    {
      computerMove = 'Paper';
    }
    else if(randomNumber>=(2/3) && randomNumber < 1)
    {
      computerMove = 'Scissors';
    }
    return computerMove;
}
function resetScoreConfirmation(){
  let html = `
      <p id="conformatonText">Are you sure you want to reset the score?</p>
      <button id='yesButton'>Yes</button>
      <button id='noButton'>No</button>`;
    document.querySelector('.js-reset-conformation').innerHTML = html;
    
    document.getElementById('yesButton')
    .addEventListener('click',()=>{
      resetScore();
      hideMoves();
      hideResetConfirmation();
      });
    
    document.getElementById('noButton').addEventListener('click',()=>{
      hideResetConfirmation();
    })
};
function resetScore(){
    score.Losses = 0; score.Ties = 0; score.Wins = 0;
    localStorage.removeItem('score');
    updateScoreElement();
};
function hideMoves(){
  document.querySelector('.js-result').innerHTML = '';
  document.querySelector('.js-moves').innerHTML = '';
}
function hideResetConfirmation(){
  document.querySelector('.js-reset-conformation').innerHTML = '';
};