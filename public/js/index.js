import { Grid } from "./Grid.js";

let wordsInput = document.getElementById("words-input");
let gridSizeInput = document.getElementById("gridSize-input");
let submitBtn = document.querySelector(".submit");
let gridArea = document.getElementById("grid-area");
var foundArea = document.getElementById("found-words");
var para = document.getElementById("para");


submitBtn.addEventListener("click", async () => {
    const grid = new Grid();
    let words = wordsInput.value.toUpperCase().split(",");
    let gridSize = gridSizeInput.value;
    //gridArea.innerHTML = "";
    if (gridSize && words.length) {
        //remove older grids
        if (gridArea.childElementCount) {
            gridArea.removeChild(gridArea.lastChild);
            para.innerHTML = "";
        }
        let result = await fetchGridInfo(gridSize,words);
        grid.renderGrid(gridSize, result,words);
        // wordsInput.value = "";
        // gridSizeInput.value = "";
    }
    else
        alert("enter size/words")
    
})


async function fetchGridInfo(gridSize,wordList){
    const commaSeparatedWords = wordList.join(",");
    const url = `https://bilal-wordsearch-app.herokuapp.com/wordgrid?gridSize=${gridSize}&words=${commaSeparatedWords}`;
    //const url = `http://localhost:8080/wordgrid?gridSize=${gridSize}&words=${commaSeparatedWords}`;
    let response = await fetch(url);
    let result = await response.text();
    return result.split("\r\n");
}