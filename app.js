/* This Function creates the grid */
const gridSize = 4;  
const calculatorKeys = [
    ["7", "8", "9", "+"], 
    ["4", "5", "6", "-"], 
    ["1", "2", "3", "/"], 
    [".", "0", "=", "x"], 
];


const calculatorKeyTypes = [
    ["Regular", "Regular", "Regular", "Operator"], 
    ["Regular", "Regular", "Regular", "Operator"], 
    ["Regular", "Regular", "Regular", "Operator"], 
    ["Regular", "Regular", "Operator", "Operator"],
]

let columns = gridSize;
let rows = gridSize;

let storeFirstNumber = undefined;  
let storeSecondNumber = undefined; 
let storeOperator = undefined; 
let result = undefined; 
let storeSubTextFirstNumber = undefined; 

// If enableOperationCounter increments with every "button" pushed. If it exceeds 2 OR 3 depending on the opeartor, it will reset and enable the operation
let enableOperationCounter = 0;  
let enableOperation = 0; 

const grid = document.querySelector(".button_container"); 
for (var i = 0; i < rows; ++i) {
    let row = document.createElement('button'); // create row
    row.id = 'row';
    for (var j = 0; j < columns; ++j) {
        let column = document.createElement('button'); // create column
        column.className = 'calculator_buttons';    
        column.classList.add(calculatorKeyTypes[i][j]);             
                 
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
    const dispCalc = document.querySelector("#subText");

    if(dispText.classList.contains("InitMode")){
        dispText.textContent = this.textContent;
        storeSubTextFirstNumber = this.textContent; 
        dispText.classList.remove("InitMode");
        dispCalc.classList.add("InitMode"); 
    }else{
        if(dispCalc.classList.contains("InitMode")){
            dispCalc.textContent = storeSubTextFirstNumber; 
            dispCalc.classList.remove("InitMode"); 
        }
        dispCalc.textContent = dispCalc.textContent + this.textContent;
        
    }
    if(this.classList.contains("Operator")){        
        storeOperator = this.textContent;  
        if(this.textContent === "="){
            operate(dispText); 
        }                   
    }else{
        if(storeFirstNumber === undefined){
            storeFirstNumber = parseInt(this.textContent); 
            console.log("First Number Stored")
        }else{
            if(storeOperator!=undefined){
                storeSecondNumber = parseInt(this.textContent); 
                console.log("Sec. Number Stored")   
                operate(dispText);             
            }            
        }
    }
    
}

function operate(dispText){
    console.log("Operating");

    switch (storeOperator) {
        case "+": result = add(storeFirstNumber, storeSecondNumber); break;
        case "-": result = subtract(storeFirstNumber, storeSecondNumber); break; 
        case "x": result = multiply(storeFirstNumber, storeSecondNumber);break; 
        case "/": result = devide(storeFirstNumber, storeSecondNumber);break; 
        case "=": 
            dispText.textContent = result; 
            break; 
    }
}
function clearDisplay(e){
    const dispText = document.querySelector("#calculator_display span");
    const dispCalc = document.querySelector("#subText");

    dispText.textContent = "0";
    dispCalc.textContent = ""; 
    dispText.classList.add("InitMode"); 
    storeFirstNumber = undefined;
    storeSecondNumber = undefined; 
    storeOperator = undefined; 
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

const multiply = function(a, b) {
    /* loop through array and remove item */ 
   return a * b; 
}

const devide = function(a, b) {
    return a / b; 
}


const clearBTN = document.querySelector("#clearBTN");
clearBTN.addEventListener("click", clearDisplay);

const deleteBTN = document.querySelector("#deleteBTN");
deleteBTN.addEventListener("click", deleteLastDigit);


const dispText = document.querySelector("#calculator_display span");
dispText.classList.add("InitMode"); 


