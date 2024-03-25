const dragItems = document.querySelectorAll('img'),
 dropZone = document.querySelector('.drop-zone'),
 theAudios = document.querySelectorAll('audio'),
 recordTable= document.querySelector('#record-table'),
 playBtn = document.querySelector('#playButton'),
 pauseButton = document.querySelector('#pauseButton'),
 volSlider = document.querySelector('#volumeControl'),
 volAmount = document.querySelector('#volumeAmt'),
 rewindButton= document.querySelector('#rewindButton');

let previousDroppedItem = null;
let originalParentNode = null;
let audioElement = null;

function handleStartDrag(event) {
    console.log('dragged record:', this);
    event.dataTransfer.setData("text/plain", this.getAttribute('data-trackref'));
    originalParentNode = this.parentNode;
}

function handleDragOver(event) {
    event.preventDefault();
    console.log('dragged over zone');
}

function handleDrop(event) {
    event.preventDefault();

    let draggedItemId = event.dataTransfer.getData("text/plain");
    let draggedItem = document.querySelector(`[data-trackref="${draggedItemId}"]`);

    if (draggedItem) {
        // Pause all audio elements
        pauseAudio();

        // If there is a previously dropped item, move it back to the record table
        if (previousDroppedItem) {
            movePreviousDraggedItemToRecordTable();
        }

        // Create an audio element
        audioElement = document.createElement('audio');
        audioElement.setAttribute('src', `audio/${draggedItemId}.mp3`);
        audioElement.setAttribute('class', 'audio-overlay');
        audioElement.setAttribute('autoplay', '');

        // Create a wrapper div to hold both the image and audio elements
        let wrapperDiv = document.createElement('div');
        wrapperDiv.appendChild(draggedItem.cloneNode(true)); // Append the image
        wrapperDiv.appendChild(audioElement); // Append the audio

        // Append the wrapper div to the drop zone
        dropZone.innerHTML = ''; // Clear drop zone before adding new item
        dropZone.appendChild(wrapperDiv);

        // Hide the original dragged item
        draggedItem.style.display = 'none';

        // Store the wrapper div, audio element, and dragged item temporarily
        previousDroppedItem = wrapperDiv;
    } else {
        console.log('No dragged item found.');
    }
}









function addDraggedItemToDropZone(draggedItem) {
    console.log('dragged to drop zone');
    // Create an audio element
    let audioElement = document.createElement('audio');
    audioElement.setAttribute('src', `audio/${draggedItem.getAttribute('data-trackref')}.mp3`);
    audioElement.setAttribute('class', 'audio-overlay'); // Add a class to style it
    audioElement.setAttribute('autoplay', ''); // Autoplay the audio

    // Create a wrapper div to hold both the image and audio elements
    let wrapperDiv = document.createElement('div');
    wrapperDiv.appendChild(draggedItem.cloneNode(true)); // Append the image
    wrapperDiv.appendChild(audioElement); // Append the audio
    dropZone.appendChild(wrapperDiv);

    // Hide the original dragged item
    draggedItem.style.display = 'none';

    // Reset previous dropped item (if any)
    if (previousDroppedItem) {
        previousDroppedItem.style.display = 'block'; // Show the previous dropped item
    }
    previousDroppedItem = draggedItem; // Update the previous dropped item
}

function movePreviousDraggedItemToRecordTable() {
    console.log('moving to record table');
    if (previousDroppedItem) {
        // Move the previous dragged item back to its original position on the record table
        originalParentNode.appendChild(previousDroppedItem);
        previousDroppedItem = null; // Reset the previous dropped item
    }
    console.log('child appended to record table');
}


function handleDragLeave(event) {
    event.preventDefault();

    let draggedItemId = event.dataTransfer.getData("text/plain");
    let draggedItem = document.querySelector(`[data-trackref="${draggedItemId}"]`);

    // Revert the dragged item to its original position
    if (originalParentNode && draggedItem) {
        originalParentNode.appendChild(draggedItem);
    }
}

function movePreviousDraggedItemToRecordTable() {
    console.log('i have moved');
    if (previousDroppedItem) {
        // Move the previous dropped item back to its original position on the record table
        originalParentNode.appendChild(previousDroppedItem);
        console.log('child appended');
        previousDroppedItem = null; // Reset the previous dropped item
    }
}

function playAudio() {
    console.log('clicked play');
    if (audioElement) {
        audioElement.play();
    }
    console.log('playing audio');
}

function pauseAudio() {
    
    if (audioElement) {
        audioElement.pause();
    }
  
}

function restartAudio() {
    if (audioElement) {
        audioElement.currentTime = 0;
        audioElement.play();
    }
}

function setVolume() {
    if (audioElement) {
        audioElement.volume = this.value / 100;
        displayVolume();
    }
}

function displayVolume() {
    volAmount.innerText = volSlider.value;
}



// Add event listener to each img element to handle dragging it back to its original position
dragItems.forEach(dragItem => {
    dragItem.addEventListener('dragstart', handleStartDrag);
});


dropZone.addEventListener('dragover', handleDragOver);
dropZone.addEventListener('drop', handleDrop);

dropZone.addEventListener('dragleave', handleDragLeave);

recordTable.addEventListener('dragover', handleDragOver);
recordTable.addEventListener('drop', handleDrop);

playBtn.addEventListener('click', playAudio);
rewindButton.addEventListener('click', restartAudio);
pauseButton.addEventListener('click', pauseAudio);
volSlider.addEventListener('change', setVolume);
