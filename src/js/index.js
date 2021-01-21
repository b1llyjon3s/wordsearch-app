import { Grid } from "./Grid.js";

let wordsInput = document.getElementById("words-input");
let gridSizeInput = document.getElementById("gridSize-input");
let submitBtn = document.querySelector(".submit");
let gridArea = document.getElementById("grid-area");
const grid = new Grid();



submitBtn.addEventListener("click", async () => {
    gridArea.innerHTML = "";
    let words = wordsInput.value.split(",");
    let gridSize = gridSizeInput.value;
    if(gridSize && words.length){
        let result = await fetchGridInfo(gridSize,words);
        grid.renderGrid(gridSize, result);
    }
    wordsInput.value = "";
    gridSizeInput.value = "";
})


async function fetchGridInfo(gridSize,wordList){
    const commaSeparatedWords = wordList.join(",");
    //const url = `https://bilal-wordsearch-app.herokuapp.com/wordgrid?gridSize=7&words=${commaSeparatedWords}`;
    const url = `http://localhost:8080/wordgrid?gridSize=${gridSize}&words=${commaSeparatedWords}`;
    let response = await fetch(url);
    let result = await response.text();
    return result.split("\r\n");
}