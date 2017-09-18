const sound = document.querySelector("#kick");
var BPM = document.querySelector(".bpmSlider input");
var refreshIntervalId = 0;
var isPressed = 0;
var playToggle = 0;

function play(){
  sound.play();
}

//Play and stop based on spacebar.
function spaceBar(e){
  //Whenever spacebar is pressed, toggle the play state.
  if(`${e.keyCode}`== 32){isPressed += 1;}
  playToggle = isPressed % 2;
  //always clear current loop and set HTML to current BPM value.
  if(refreshIntervalId !=0){clearInterval(refreshIntervalId)};
  document.querySelector("#bpmValue").innerHTML = BPM.value;
  //if play state is 1 then start a new loop
  if(playToggle==1){
    refreshIntervalId = setInterval(play, 1000*60/BPM.value);
  }
}

function handleUpdate(){
  //clear current loop
  if(refreshIntervalId !=0){clearInterval(refreshIntervalId)};
  //set BPM value from the slider.
  BPM.value = this.value;
  //print value to screen.
  document.querySelector("#bpmValue").innerHTML = BPM.value;
  //start new loop at current BPM
  refreshIntervalId = setInterval(play, 1000*60/BPM.value);
}

//trigger spaceBar function from any keydown event.
window.addEventListener('keydown', spaceBar);
//trigger handleUpdate function based on any change to slider.
BPM.addEventListener("change",handleUpdate);
