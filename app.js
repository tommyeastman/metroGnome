const sound = document.querySelector("#kick");
var BPM = document.querySelector(".bpmSlider input");
var refreshIntervalId = 0;
//console.log(sound);
//console.log(BPM);

function play(){
  sound.play();
}

function handleUpdate(){
  console.log(refreshIntervalId);
  if(refreshIntervalId !=0){clearInterval(refreshIntervalId)};
  BPM.value = this.value;
  document.querySelector("#bpmValue").innerHTML = BPM.value;
  console.log(BPM.value);
  console.log(1000*60/BPM.value)
  refreshIntervalId = setInterval(play, 1000*60/BPM.value);
  console.log(refreshIntervalId);
}


//setInterval(play,1000);
BPM.addEventListener("change",handleUpdate);
BPM.addEventListener("change",handleUpdate);
