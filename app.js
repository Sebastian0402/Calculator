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

    //Create eventlistener 
    listen();
}   

function listen(){
    const buttons = document.querySelectorAll(".calculator_buttons"); 
    buttons.forEach(calculator_buttons => calculator_buttons.addEventListener("click", display));
}

function display(e){
    const dispText = document.querySelector("#calculator_display span");
    if(dispText.classList.contains("InitMode")){
        dispText.textContent = this.textContent;
        dispText.classList.remove("InitMode");
    }else{
        dispText.textContent = dispText.textContent + this.textContent;
    }
}

function clearDisplay(e){
    const dispText = document.querySelector("#calculator_display span");
    dispText.textContent = "0";
    dispText.classList.add("InitMode"); 
}

function deleteLastDigit(e){
    const dispText = document.querySelector("#calculator_display span");
    if(dispText.textContent.length <=1){
        dispText.textContent = "0";
        dispText.classList.add("InitMode"); 
    }else{
        dispText.textContent = dispText.textContent .slice(0, -1); 
    }
}

const add = function(a, b) {
	return a + b; 
};

const subtract = function(a,b) {
  return a - b; 
}

const multiply = function() {
	const array = arguments[0]; 
    /* loop through array and remove item */ 
    let product = 1;   
    for(let i = 0; i < array.length; i++){
        product *= array[i];
    }  
    return product;  
};

const devide = function() {
	const array = arguments[0]; 
    /* loop through array and remove item */ 
    let product = 1;   
    for(let i = 0; i < array.length; i++){
        product /= array[i];
    }  
    return product;  
};

const clearBTN = document.querySelector("#clearBTN");
clearBTN.addEventListener("click", clearDisplay);

const deleteBTN = document.querySelector("#deleteBTN");
deleteBTN.addEventListener("click", deleteLastDigit);


const dispText = document.querySelector("#calculator_display span");
dispText.classList.add("InitMode"); 


