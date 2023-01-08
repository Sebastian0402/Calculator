/* This Function creates the grid */
const gridSize = 4;  
const calculatorKeys = [
    ["7", "8", "9", "+"], 
    ["4", "5", "6", "-"], 
    ["1", "2", "3", "/"], 
    [".", "0", "=", "x"], 
];

let columns = gridSize;
let rows = gridSize;
const grid = document.querySelector(".button_container"); 
for (var i = 0; i < rows; ++i) {
    let row = document.createElement('button'); // create row
    row.id = 'row';
    for (var j = 0; j < columns; ++j) {
        let column = document.createElement('button'); // create column
        column.className = 'calculator_buttons';        
        column.textContent = calculatorKeys[i][j];     
        row.appendChild(column); // append row in column
    }
    grid.appendChild(row); // append column inside grid
}   
