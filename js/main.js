const dragItems = document.querySelectorAll('img'),
 dropZone = document.querySelector('#drop-zone'),
 theAudios = document.querySelectorAll('#audio'),
 recordTable= document.querySelector('#record-table'),
 pauseButton = document.querySelector('#pauseButton'),
 volSlider = document.querySelector('#volumeControl'),
 volAmount = document.querySelector('#volumeAmt');

let previousDroppedItem = null;
let originalParentNode = null;

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
        if (!dropZone.children.length) {
            // Create an audio element
            let audioElement = document.createElement('audio');
            audioElement.setAttribute('src', `audio/${draggedItemId}.mp3`);
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
    } else {
        console.log('No dragged item found.');
    }
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

dragItems.forEach(dragItem => {
    dragItem.addEventListener('dragstart', handleStartDrag);
});


// Add event listener to each img element to handle dragging it back to its original position
dragItems.forEach(dragItem => {
    dragItem.addEventListener('dragstart', handleStartDrag);
});


dropZone.addEventListener('dragover', handleDragOver);
dropZone.addEventListener('drop', handleDrop);

dropZone.addEventListener('dragleave', handleDragLeave);

recordTable.addEventListener('dragover', handleDragOver);
recordTable.addEventListener('drop', handleDrop);

pauseButton.addEventListener('click', pauseAudio);
volSlider.addEventListener('change', setVolume);
