const dragItems = document.querySelectorAll('img');
const dropZone = document.querySelector('#drop-zone');
const theAudios = document.querySelectorAll('#audio');


const pauseButton = document.querySelector('#pauseButton');
const volSlider = document.querySelector('#volumeControl');
const volAmount = document.querySelector('#volumeAmt');

function handleStartDrag(event) {
    console.log('dragged record:', this);
    event.dataTransfer.setData("text/plain", this.getAttribute('data-trackref'));
}

function handleDragOver(event) {
    event.preventDefault();
    console.log('dragged over zone');
}


function handleDrop(event) {
    event.preventDefault();
    // console.log('handleDrop function called');
    // console.log('dropped onto record player');

    let draggedItemId = event.dataTransfer.getData("text/plain");
    // console.log('draggedItemId:', draggedItemId);
    
    let draggedItem = document.querySelector(`[data-trackref="${draggedItemId}"]`);
    // console.log('draggedItem:', draggedItem);

    if (draggedItem) {
        console.log('found item');
        // If there are no child nodes in the drop zone, proceed
        // console.log(!dropZone.hasChildNodes());
        if (! dropZone.children.length) { // this is false, when should be true
            console.log('here????');
            // Clone the dragged item
            let clonedItem = draggedItem.cloneNode(true);
            this.appendChild(clonedItem);
            // Hide the original dragged item
        

            // Call loadAudio with the dropped record
           // loadAudio(clonedItem);
        }
    } else {
        console.log('No dragged item found.');
    }
}


function loadAudio(audioElement, trackRef) {
    console.log(audioElement);
    console.log('loadAudio() called');
    let audioUrl = `audio/${trackRef}.mp3`;
    console.log('Audio URL:', audioUrl);
    
    // Use theAudios NodeList defined earlier
    if (audioElement) {
        // Access the first audio element in the NodeList
        console.log('audio element found:', audioElement);
        audioElement.src = audioUrl;
        console.log('audio src set:', audioElement.src);

        audioElement.addEventListener('play', function() {
            console.log('Audio playback started');
        });

        audioElement.addEventListener('pause', function() {
            console.log('Audio playback paused');
        });

        audioElement.addEventListener('ended', function() {
            console.log('Audio playback ended');
        });

        audioElement.addEventListener('error', function() {
            console.error('Error during audio playback');
        });

        audioElement.load();
        audioElement.play();
    } else {
        console.log('No audio element found.');
    }
}




function pauseAudio() {
    theAudios.forEach(audio => audio.pause());
}

function setVolume() {
    console.log(this.value);
    theAudios.forEach(audio => {
        audio.volume = this.value / 100;
    });
    displayVolume();
}

function displayVolume() {
    volAmount.innerText = volSlider.value;
}

dropZone.addEventListener('dragover', handleDragOver);
dropZone.addEventListener('drop', handleDrop);

dragItems.forEach(dragItem => {
    dragItem.addEventListener('dragstart', handleStartDrag);
});

// dragItems.forEach(dragItem => {
    // dragItem.addEventListener('drop', () => {
        // loadAudio(dragItem.parentNode); // Get the parent node (the record) and pass it to loadAudio
    // });
// });
pauseButton.addEventListener('click', pauseAudio);
volSlider.addEventListener('change', setVolume);
