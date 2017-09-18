const sound = document.querySelector("#kick");
const gnome = document.querySelector(".gnome");
var BPM = document.querySelector(".bpmSlider input");
var oneBeatLoopId = 0;
var quarterBeatLoopId = 0;
var isPressed = 0;
var playToggle = 0;

//for 1 beats
function oneBeats(){
  gnome.classList.add("gnomeBig");
}

//for quarter beats
function quarterBeats(){
  sound.play();
  gnome.classList.add("gnomeBlink");
}

function removeTransition(e){
  this.classList.remove("gnomeBig");
  this.classList.remove("gnomeBlink");
}

//Play and stop based on spacebar.
function spaceBar(e){
  //Whenever spacebar is pressed, toggle the play state.
  if(`${e.keyCode}`== 32){isPressed += 1;}
  playToggle = isPressed % 2;
  //always clear current loop and set HTML to current BPM value.
  if(oneBeatLoopId !=0){clearInterval(oneBeatLoopId)};
  if(quarterBeatLoopId !=0){clearInterval(quarterBeatLoopId)};
  document.querySelector("#bpmValue").innerHTML = BPM.value;
  //if play state is 1 then start a new loop
  if(playToggle==1){
    quarterBeatLoopId = setInterval(oneBeats, 1000*60/BPM.value*4);
    oneBeatLoopId = setInterval(quarterBeats, 1000*60/BPM.value);
  }
}

function sliderUpdate(){
  //clear current loop
  if(oneBeatLoopId !=0){clearInterval(oneBeatLoopId)};
  if(quarterBeatLoopId !=0){clearInterval(quarterBeatLoopId)};
  //set BPM value from the slider.
  BPM.value = this.value;
  //print value to screen.
  document.querySelector("#bpmValue").innerHTML = BPM.value;
  //start new loop at current BPM
  quarterBeatLoopId =setInterval(oneBeats, 1000*60/BPM.value*4);
  oneBeatLoopId = setInterval(quarterBeats, 1000*60/BPM.value);
}

//trigger spaceBar function from any keydown event.
window.addEventListener('keydown', spaceBar);
//trigger sliderUpdate function based on any change to slider.
BPM.addEventListener("change", sliderUpdate);
//remove transition
gnome.addEventListener('transitionend', removeTransition);
