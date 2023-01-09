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
let storefirstFirstNumber = undefined;
let storeOperator = undefined; 
let storePrevOperator = undefined; 
let result = undefined; 
let storeSubTextFirstNumber = ""; 
let storeSubTextSecondNumber = ""; 

let floatingInput = ""; 
// If enableOperationCounter increments with every "button" pushed. If it exceeds 2 OR 3 depending on the opeartor, it will reset and enable the operation
let enableOperationCounter = 0;  
let enableOperation = 0; 

const currentNumberIsFirstNumber = 1;
const currentNumberIsSecondNumber = 2; 
let currentNumber = currentNumberIsFirstNumber; 

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
    
    

    if(this.classList.contains("Operator")){  
        dispCalc.textContent = dispCalc.textContent + " " + this.textContent + " ";
        //Operator as Input => Handle Storage of Input numbers 
        //Check if second number was floating point input 
        if(currentNumber === currentNumberIsFirstNumber){
            storeFirstNumber = parseFloat(storeSubTextFirstNumber); 
            console.log("First Number Stored: " + storeSubTextFirstNumber);
            currentNumber = currentNumberIsSecondNumber;
        }else{
            storeSecondNumber = parseFloat(storeSubTextSecondNumber); 
            console.log("Second Number Stored");            
        }            
                  
        storeOperator = this.textContent;  
        //End of possible floating Input 
        dispCalc.classList.remove("FloatInput");  
        // Check if Chained Operation, Then do Calculation until now 
        if(enableOperationCounter > 0){
            //If current Operator is + or -, consideration of the first operator type is not needed  
            if( (storeOperator === "+") || (storeOperator === "-") ){
                operate(dispText, "=");
                storeFirstNumber = result; 
                storeSecondNumber = undefined; 
                storeSubTextFirstNumber = ""; 
                storeSubTextSecondNumber = ""; 
                enableOperationCounter = 0; 
            }
            //If current Operator is * or /, consideration of the first operator type is needed  
            if( (storeOperator === "x") || (storeOperator === "/") ){
                //If prev operator was "x" or "/", then "standard chaining"
                if((storePrevOperator === "x") || (storePrevOperator === "/") ){
                    operate(dispText, "=");
                    storeFirstNumber = result; 
                    storeSecondNumber = undefined; 
                    storeSubTextFirstNumber = undefined; 
                    storeSubTextSecondNumber = undefined; 
                    enableOperationCounter = 0; 
                }
                //If prev operator was "+" or "-", then the right order has to be considered
                if( (storeOperator === "+") || (storeOperator === "-") ){
                    //Mul/Div has to be done first => Save first number for later, set second number to first number and wait for second number 
                    if(enableOperationCounter < 2){
                        storefirstFirstNumber = storeFirstNumber; 
                        storeFirstNumber = storeSecondNumber; 
                        storeSecondNumber = undefined; 
                    }else{
                        //Mul/Div Operation was already executed. 
                        operate(dispText, "=");
                        //Change back order 
                        storeFirstNumber = storefirstFirstNumber;
                        storeSecondNumber = result; 
                        console.log(result);
                        storeSubTextFirstNumber = undefined; 
                        storeSubTextSecondNumber = undefined; 
                        enableOperationCounter = 0; 
                    }
                }
                
            }
        }
        
        if(this.textContent === "="){
            operate(dispText, storePrevOperator); 
            operate(dispText, storeOperator);
            enableOperationCounter = 0; 
        }

        storePrevOperator = storeOperator; 
        enableOperationCounter  ++;                   
    }else{
        /* ----- Regular Number as Input ------*/
        dispCalc.textContent = dispCalc.textContent + this.textContent;       
        // Currently First Number
        if(currentNumber === currentNumberIsFirstNumber){
            storeSubTextFirstNumber = storeSubTextFirstNumber + this.textContent;
            dispText.textContent = storeSubTextFirstNumber;            
        }else{                
            storeSubTextSecondNumber = storeSubTextSecondNumber + this.textContent;      
            dispText.textContent = storeSubTextSecondNumber;                         
        } 
    }    

    /*------- Handle Display Output ----------*/ 
    if(dispText.classList.contains("InitMode")){
        dispText.classList.remove("InitMode");
        dispCalc.classList.add("InitMode"); 
    }else{
        if(dispCalc.classList.contains("InitMode")){
            dispCalc.classList.remove("InitMode"); 
        }
    }
}

function operate(dispText, operator){
    console.log("Operating");
    console.log(operator);
    switch (operator) {
        case "+": result = add(storeFirstNumber, storeSecondNumber); console.log(result); break;
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
    storeSubTextFirstNumber = ""; 
    storeSubTextSecondNumber = ""; 
    result = undefined;

    currentNumber = currentNumberIsFirstNumber;

    enableOperationCounter = 0; 
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
    //Check if input is floating point 
    if((a % 1 != 0) || (b %1 != 0)){
        return (a + b).toFixed(3);
    }
	return a + b; 
};

const subtract = function(a,b) {
    //Check if input is floating point 
    if((a % 1 != 0) || (b %1 != 0)){
        return (a - b).toFixed(3);
    }
  return a - b; 
}

const multiply = function(a, b) {
    //Check if input is floating point 
    if((a % 1 != 0) || (b %1 != 0)){
        return (a * b).toFixed(3);
    }
   return (a * b); 
}

const devide = function(a, b) {
     //Check if result is floating point 
    let result = a/b; 
    if(result % 1 != 0){
        return result.toFixed(3);
    }
    return result; 
}


const clearBTN = document.querySelector("#clearBTN");
clearBTN.addEventListener("click", clearDisplay);

const deleteBTN = document.querySelector("#deleteBTN");
deleteBTN.addEventListener("click", deleteLastDigit);


const dispText = document.querySelector("#calculator_display span");
dispText.classList.add("InitMode"); 


