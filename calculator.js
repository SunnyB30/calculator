let userInput = []; 
let operator = [];
let numberStorage = [];



getNumbers();
getOperator();
getEquals();
getClear(); 


//Event listener functions

function getNumbers () {

    let buttons = document.querySelectorAll(".number");
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            userInput.push(button.value);
            appendDisplay(userInput.join(""));
        });
    });

}

function getOperator () {
    let buttons = document.querySelectorAll(".operator");

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            operator.push(button.value);

            if (userInput.length) {
                numberStorage.push(userInput.join(""));

                if (numberStorage.length > 1) {
                    let result = operate(parseInt(numberStorage.at(-2)), parseInt(numberStorage.at(-1)), operator.at(-2));
                    appendDisplay(result);
                    numberStorage.push(result); 
                }
            }
            userInput = [];
        });
    });
}

function getEquals () {
    let button = document.querySelector(".equals");

    button.addEventListener('click', () => {
        if (userInput.length) {
            numberStorage.push(userInput.join(""));

            if(numberStorage.length > 1) {
                
                let result = operate(parseInt(numberStorage.at(-2)), parseInt(numberStorage.at(-1)), operator.at(-1));
                appendDisplay(result);
                numberStorage.push(result);
            }
        }
        userInput = []; 
    });
}

function getClear () {

    let button = document.querySelector(".clear");
    button.addEventListener('click', () => {
        userInput = []; 
        operator = [];
        numberStorage = [];
        appendDisplay("");
    });
}

//display functions

function appendDisplay (update) {
    document.querySelector(".display").textContent = update; 
}


//calculation functions 

function operate (numberA, numberB, sign) {
    
    let operator = sign; 
    
    if (operator === "+") {
        return add(numberA, numberB);
    }
    else if (operator === "-") {
        return subtract(numberA, numberB);
    }
    else if (operator === "*") {
        return multiply(numberA, numberB);
    }
    else {
        return divide (numberA, numberB);
    }
}


function add (numA, numB) {
    return numA + numB;
}

function subtract (numA, numB) {
    return numA - numB;
}

function multiply (numA, numB) {
    return numA * numB;
}

function divide (numA, numB) {
    return numA / numB;
}












