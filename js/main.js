let theRecords = document.querySelectorAll(".records"),
    recordTable= document.querySelector("#record-table"),
    dropZone= document.querySelectorAll('#record-player'),

    draggedRecord;

    function handleStartDrag(){
        console.log('dragged record:', this);
        draggedRecord=this;
    }

     function handleDragOver(event){
        event.preventDefault();
        console.log('dragged over zone');
     }

     function handleDrop(event){
        console.log('handleDrop function called');
        event.preventDefault();
        console.log('dropped onto record player');
        if(!this.hasChildNodes()&&!draggedRecord.parentNode.classList.contains('record-table')){
            this.appendChild(draggedRecord);
        }
     }

     theRecords.forEach(record => record.addEventListener("dragstart", handleStartDrag));

     dropZone.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('drop', handleDrop);
     });