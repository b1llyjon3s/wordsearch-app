import { Grid } from "./Grid.js";

let wordsInput = document.getElementById("words-input");
let gridSizeInput = document.getElementById("gridSize-input");
let submitBtn = document.querySelector(".submit");
let gridArea = document.getElementById("grid-area");
var foundArea = document.getElementById("found-words");
const grid = new Grid();



submitBtn.addEventListener("click", async () => {
    let words = wordsInput.value.toUpperCase().split(",");
    let gridSize = gridSizeInput.value;
    //gridArea.innerHTML = "";
    if (gridSize && words.length) {
        //remove older grids
        if (gridArea.childElementCount) {
            gridArea.removeChild(gridArea.lastChild);
        }
        if(foundArea.childElementCount){
            while(foundArea.childElementCount){foundArea.removeChild(foundArea.lastChild)};
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
    //const url = `https://bilal-wordsearch-app.herokuapp.com/wordgrid?gridSize=${gridSize}&words=${commaSeparatedWords}`;
    const url = `http://localhost:8080/wordgrid?gridSize=${gridSize}&words=${commaSeparatedWords}`;
    let response = await fetch(url);
    let result = await response.text();
    return result.split("\r\n");
}