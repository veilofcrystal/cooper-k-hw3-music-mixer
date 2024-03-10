let dragItems= document.querySelectorAll('.drag-item');
   let recordTable= document.querySelector('#record-table');
   let dropZone= document.querySelector('#drop-zone');

   let draggedItem;

    function handleStartDrag(){
        console.log('dragged record:', this);
        draggedItem=this.cloneNode(true);
    }

     function handleDragOver(event){
        event.preventDefault();
        console.log('dragged over zone');
     }

     function handleDrop(event){
        console.log('handleDrop function called');
        event.preventDefault();
        console.log('dropped onto record player');
        if(!this.hasChildNodes()&&!draggedItem.parentNode.classList.contains('record-table')){
            this.appendChild(draggedItem);
        }
     }

     dragItems.forEach(record => record.addEventListener("dragstart", handleStartDrag));

     
        dropZone.addEventListener('dragover', handleDragOver);
        dropZone.addEventListener('drop', handleDrop);
     