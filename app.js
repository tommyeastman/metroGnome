const sound = document.querySelector("#kick");
const gnome = document.querySelector(".gnome");
var BPM = document.querySelector(".bpmSlider input");
var refreshIntervalId = 0;
var gnomeIntervalId = 0;
var isPressed = 0;
var playToggle = 0;

//for quarter beats
function play(){
  sound.play();
  gnome.classList.add("quarterBeats");
}

//for 1 beats
function gnomeBig(){
  gnome.classList.add("playing");
}

function removeTransition(e){
  this.classList.remove("playing");
  this.classList.remove("quarterBeats");
}

//Play and stop based on spacebar.
function spaceBar(e){
  //Whenever spacebar is pressed, toggle the play state.
  if(`${e.keyCode}`== 32){isPressed += 1;}
  playToggle = isPressed % 2;
  //always clear current loop and set HTML to current BPM value.
  if(refreshIntervalId !=0){clearInterval(refreshIntervalId)};
  if(gnomeIntervalId !=0){clearInterval(gnomeIntervalId)};
  document.querySelector("#bpmValue").innerHTML = BPM.value;
  //if play state is 1 then start a new loop
  if(playToggle==1){
    refreshIntervalId = setInterval(play, 1000*60/BPM.value);
    gnomeIntervalId = setInterval(gnomeBig, 1000*60/BPM.value*4);
  }
}

function handleUpdate(){
  //clear current loop
  if(refreshIntervalId !=0){clearInterval(refreshIntervalId)};
  if(gnomeIntervalId !=0){clearInterval(gnomeIntervalId)};
  //set BPM value from the slider.
  BPM.value = this.value;
  //print value to screen.
  document.querySelector("#bpmValue").innerHTML = BPM.value;
  //start new loop at current BPM
  refreshIntervalId = setInterval(play, 1000*60/BPM.value);
  gnomeIntervalId =setInterval(gnomeBig, 1000*60/BPM.value*4);
}

//trigger spaceBar function from any keydown event.
window.addEventListener('keydown', spaceBar);
//trigger handleUpdate function based on any change to slider.
BPM.addEventListener("change", handleUpdate);
//remove transition
gnome.addEventListener('transitionend', removeTransition);
