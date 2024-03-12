let dragItems = document.querySelectorAll('.drag-item');
let dropZone = document.querySelector('.drop-zone');
let audios = document.querySelectorAll('.audio');
let currentAudio = null;


const playButton= document.querySelector('#playButton');
const pauseButton=document.querySelector('#pauseButton');
const rewindButton= document.querySelector('#rewindButton');
const volSlider= document.querySelector('#volumeControl');
const volAmount = document.querySelector('#volumeAmt');


function loadAudio(){
   let newSrc=`audio/${this.dataset.trackref}.mp3`;
   this.src =newSrc;
   this.load();
   playAudio();
}

function playAudio(){
   if (currentAudio){
      currentAudio.play();
   }
  }
  
  function restartAudio(){
      audios.currentTime= 0;
      playAudio();
  }
  
  function pauseAudio(){
    audios.pause();
  }
  
  function setVolume(){
      console.log(this.value);
      audios.volume=this.value / 100;
      displayVolume();
    
  }
  
   function displayVolume (){
      volAmount.innerText =volSlider.value;
   }

function handleStartDrag(event) {
    console.log('dragged record:', this);
    event.dataTransfer.setData("text/plain", this.id);
}

function handleDragOver(event) {
    event.preventDefault();
    console.log('dragged over zone');
}

function handleDrop(event) {
    console.log('handleDrop function called');
    event.preventDefault();
    console.log('dropped onto record player');

    if (!dropZone.hasChildNodes()) {
        let draggedItemId = event.dataTransfer.getData("text/plain");
        let draggedItem = document.getElementById(draggedItemId);

        // Find the corresponding audio element
        let audioId = draggedItem.getAttribute('data-key');
        console.log('Audio Id:', audioId);
        let audio = document.querySelector(`.audio[data-key="${audioId}"]`);
        console.log('Audio element:', audio);

        if (audio) {
            console.log('found audio element', audio);
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
            currentAudio = audio;
            currentAudio.currentTime= 0;
            currentAudio.play();
        }
        dropZone.appendChild(draggedItem);
    }
}

dragItems.forEach(record => {
    record.addEventListener("dragstart", handleStartDrag);
    record.addEventListener("dragend", () => {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
        }
    });
});

dropZone.addEventListener('dragover', handleDragOver);
dropZone.addEventListener('drop', handleDrop);
playButton.addEventListener('click', playAudio);
rewindButton.addEventListener('click', restartAudio);
pauseButton.addEventListener('click', pauseAudio);
volSlider.addEventListener('change', setVolume);