export class Grid{
    renderGrid(gridSize, wordGrid){
        // get the reference for the gridArea
        var gridArea = document.getElementById("grid-area");

        var tbl = document.createElement("table");
        var tblBody = document.createElement("tbody");

        for (var i = 0; i < gridSize; i++) {
            var row = document.createElement("tr");
            var gridRow = wordGrid[i].split(" ");
            for (var j = 0; j < gridSize; j++) {
                var cell = document.createElement("td");
                var cellText = document.createTextNode(gridRow[j]);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            tblBody.appendChild(row);
        }
        tbl.appendChild(tblBody);
        gridArea.appendChild(tbl);
        tbl.setAttribute("border", "1");
    }
}