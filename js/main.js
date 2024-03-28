document.addEventListener("DOMContentLoaded", function() {
    const dragItems = document.querySelectorAll('.drag-item');
    const dropZones = document.querySelectorAll('.drop-zone');
    const audioElements = [];
    const recordTable = document.querySelector('#record-table');
    const playButton = document.querySelector('#playButton');
    const pauseButton = document.querySelector('#pauseButton');
    const rewindButton = document.querySelector('#rewindButton');
    const volumeControl = document.querySelector('#volumeControl');
    const volumeAmount = document.querySelector('#volumeAmt');
    let initialPlayTime = null;

    // Function to play audio
    function playAudio() {
        audioElements.forEach(audioElement => {
            if (audioElement) {
                audioElement.play();
            }
        });
    }

    // Function to pause audio
    function pauseAudio() {
        audioElements.forEach(audioElement => {
            if (audioElement) {
                audioElement.pause();
            }
        });
    }

    // Function to rewind audio
    function rewindAudio() {
        audioElements.forEach(audioElement => {
            if (audioElement) {
                audioElement.currentTime = 0;
            }
        });
    }

    // Function to set volume
    function setVolume() {
        audioElements.forEach(audioElement => {
            if (audioElement) {
                audioElement.volume = volumeControl.value / 100;
                volumeAmount.innerText = volumeControl.value;
            }
        });
    }

    // Event listeners for play, pause, rewind, and volume controls
    playButton.addEventListener('click', playAudio);
    pauseButton.addEventListener('click', pauseAudio);
    rewindButton.addEventListener('click', rewindAudio);
    volumeControl.addEventListener('input', setVolume);

    // Function to handle starting drag
    function handleStartDrag(event) {
        console.log('dragged record:', this);
        event.dataTransfer.setData("text/plain", this.getAttribute('data-trackref'));
        originalParentNode = this.parentNode;
    }

    // Function to handle drag over
    function handleDragOver(event) {
        event.preventDefault();
        console.log('dragged over zone');
    }

    // Function to handle drop
    function handleDrop(event) {
        event.preventDefault();

        let draggedItemId = event.dataTransfer.getData("text/plain");
        let draggedItem = document.querySelector(`[data-trackref="${draggedItemId}"]`);

        if (draggedItem) {
            const dropZone = event.currentTarget;

            // Create an audio element
            const audioElement = document.createElement('audio');
            audioElement.setAttribute('src', `audio/${draggedItemId}.mp3`);
            audioElement.setAttribute('class', 'audio-overlay');
            audioElement.setAttribute('autoplay', '');

            // Set currentTime to 0 to ensure playback starts from the beginning
            audioElement.currentTime = 0;

            // Create a wrapper div to hold both the image and audio elements
            const wrapperDiv = document.createElement('div');
            wrapperDiv.appendChild(draggedItem.cloneNode(true)); // Append the image
            wrapperDiv.appendChild(audioElement); // Append the audio

            // Append the wrapper div to the drop zone
            dropZone.innerHTML = ''; // Clear drop zone before adding new item
            dropZone.appendChild(wrapperDiv);

            // Hide the original dragged item
            draggedItem.style.display = 'none';

            // Calculate delay for synchronization
            const delay = Date.now() - initialPlayTime;

            // Start playback after the calculated delay
            setTimeout(() => {
                audioElement.play();
            }, delay);

            // Update initial play time if it's the first record
            if (!initialPlayTime) {
                initialPlayTime = Date.now();
                console.log('Initial play time:', initialPlayTime);
            }

            // Add the new audio element to the list
            audioElements.push(audioElement);
            console.log('Audio elements:', audioElements);
        } else {
            console.log('No dragged item found.');
        }
    }

    // Adding event listeners for drag and drop functionality
    dragItems.forEach(dragItem => {
        dragItem.addEventListener('dragstart', handleStartDrag);
    });

    dropZones.forEach(dropZone => {
        dropZone.addEventListener('dragover', handleDragOver);
        dropZone.addEventListener('drop', handleDrop);
    });
});