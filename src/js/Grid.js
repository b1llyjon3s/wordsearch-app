export class Grid{
    renderGrid(gridSize, wordGrid,words){
        // get the reference for the gridArea
        var gridArea = document.getElementById("grid-area");
        var foundArea = document.getElementById("found-words");

        var tbl = document.createElement("table");
        var tblBody = document.createElement("tbody");

        for (var i = 0; i < gridSize; i++) {
            var row = document.createElement("tr");
            var gridRow = wordGrid[i].split(" ");
            for (var j = 0; j < gridSize; j++) {
                var cell = document.createElement("td");
                var cellText = document.createTextNode(gridRow[j]);
                var letter = gridRow[j];
                cell.appendChild(cellText);
                cell.setAttribute('data-x', i);
                cell.setAttribute('data-y',j);
                cell.setAttribute('data-letter', letter);
                row.appendChild(cell);
            }
            tblBody.appendChild(row);
        }
        tbl.appendChild(tblBody);
        gridArea.appendChild(tbl);

        let wordSelectMode = false;
        let selectedItems = [];
        let direction ='';
        let validSelect = true;
        let foundWords = [];

        //click handler
        //mouse-down
        gridArea.addEventListener('mousedown', function (event) {
            wordSelectMode = true;
        })
        //mouse-move
        gridArea.addEventListener('mousemove', function (event) {
            if(wordSelectMode){
                let lastSelectedItem;
                const cell = event.target;
                if (cell.getAttribute('data-x') != null){
                    
                    let x = cell.getAttribute('data-x');
                    let y = cell.getAttribute('data-y');
                    let letter = cell.getAttribute('data-letter');
                    let currentItem = {
                        x, y, letter, cell
                    };
    
                    if (selectedItems.length > 0){
                        lastSelectedItem = selectedItems[selectedItems.length - 1];
                        if(lastSelectedItem.x === currentItem.x && lastSelectedItem.y === currentItem.y) return;
                        if (selectedItems.length == 1) {
                            direction = getDirection(lastSelectedItem,currentItem);
                        }
                        switch (direction) {
                            case 'HORIZONTAL':
                                if (currentItem.x == lastSelectedItem.x && currentItem.y == (parseInt(lastSelectedItem.y) + 1))
                                    validSelect = true;
                                break;
                            case 'VERTICAL':
                                if (currentItem.y == lastSelectedItem.y && currentItem.x == (parseInt(lastSelectedItem.x) + 1))
                                    validSelect = true;
                                break;
                            case 'DIAGONAL':
                                if (currentItem.y == (parseInt(lastSelectedItem.y) + 1) && currentItem.x == (parseInt(lastSelectedItem.x) + 1))
                                    validSelect = true;
                                break;
                            case 'I_HORIZONTAL':
                                if (currentItem.x == lastSelectedItem.x && currentItem.y == (parseInt(lastSelectedItem.y) - 1))
                                    validSelect = true;
                                break;
                            case 'I_VERTICAL':
                                if (currentItem.y == lastSelectedItem.y && currentItem.x == (parseInt(lastSelectedItem.x) - 1))
                                    validSelect = true;
                                break;
                            case 'I_DIAGONAL':
                                if (currentItem.y == (parseInt(lastSelectedItem.y) - 1) && currentItem.x == (parseInt(lastSelectedItem.x) - 1))
                                    validSelect = true;
                                break;

                            default:
                                break;
                        }
                    }
                    
                    if(validSelect){
                        event.target.classList.add('selected');
                        selectedItems.push({
                            x, y, letter, cell
                        });
                        validSelect = false;
                    }
                }
            }
        })
        //mouse-up
        gridArea.addEventListener('mouseup', function (event) {
            wordSelectMode = false;
            let selectedWord = stringify(selectedItems);
            if (words.includes(selectedWord))
                if(!foundWords.includes(selectedWord)){
                    var para = document.createElement("p");
                    //var text = document.createTextNode(selectedWord);
                    para.innerHTML = selectedWord;
                    foundArea.appendChild(para);
                    foundWords.push(selectedWord);
            }
            selectedItems.forEach(item => item.cell.classList.remove('selected'));
            validSelect = true;
            selectedItems = [];
        })

        let getDirection = (lastSelectedItem,currentItem) => {
            if (currentItem.x == lastSelectedItem.x && currentItem.y == (parseInt(lastSelectedItem.y)+1) )
                return "HORIZONTAL";
            else if (currentItem.y == lastSelectedItem.y && currentItem.x == (parseInt(lastSelectedItem.x) + 1))
                return "VERTICAL";
            else if (currentItem.y == (parseInt(lastSelectedItem.y) + 1) && currentItem.x == (parseInt(lastSelectedItem.x) + 1))
                return "DIAGONAL";
            else if (currentItem.x == lastSelectedItem.x && currentItem.y == (parseInt(lastSelectedItem.y) - 1))
                return "I_HORIZONTAL";
            else if (currentItem.y == lastSelectedItem.y && currentItem.x == (parseInt(lastSelectedItem.x) - 1))
                return "I_VERTICAL";
            else if (currentItem.y == (parseInt(lastSelectedItem.y) - 1) && currentItem.x == (parseInt(lastSelectedItem.x) - 1))
                return "I_DIAGONAL";
        }
        let stringify = (selectedItems) => {
            let itemStr = '';
            selectedItems.forEach(item => itemStr += item.letter);
            return itemStr;
        }
    }

}