let userInput = []; 
let operator = [];
let numberStorage = [];
let lastOperation = "";

getNumbers();
getDot ();
getOperator();
getEquals();
getClear(); 
getBackspace ();
getChangeSign ();
resetAfterInfinity (); 
findLastOperation ();

//found another issue where if I push a number after pressing equals, the result continues to operate. I need to only allow
//it to operate when another operator button is pressed OR for the result to have its sign changed.
//i need to round results when they get too large 



//Event listener functions

function getNumbers () {

    let buttons = document.querySelectorAll(".number");
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (!(button.value === "0" && getDisplay() === "0"))
            {
                console.log(lastOperation);
                if (lastOperation === "=") {
                    numberStorage = [];
                }
                userInput.push(button.value);
                appendDisplay(userInput.join(""));
            }
            
        });
    });

}

function getDot () {
    let button = document.querySelector(".dot");
    button.addEventListener('click', () => {
        if (userInput.includes(button.value) === false) {
            if (getDisplay() === "0") {
                userInput.push(getDisplay())
                userInput.push(button.value);
            }
            else if(userInput.length) {
                userInput.push(button.value);
            }
            else if (numberStorage.length) {
                userInput.push("0");
                userInput.push(button.value);
            }
            appendDisplay(userInput.join(""));
        }
    });
}

function getOperator () {
    if (userInput.at(-1) !== ".") {
        let buttons = document.querySelectorAll(".operator");
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                operator.push(button.value);
    
                if (userInput.length) {
                    numberStorage.push(userInput.join(""));
    
                    if (numberStorage.length > 1) {
                        let result = operate(parseFloat(numberStorage.at(-2)), parseFloat(numberStorage.at(-1)), operator.at(-2));
                        if (result === Infinity) {
                            appendDisplay("You broke the universe. Well done");
                        }
                        else {
                            appendDisplay(result);
                            numberStorage.push(result);
                        }  
                    }
                }
                userInput = [];
            });
        });
    }
    
}

function getEquals () {
    let button = document.querySelector(".equals");

    button.addEventListener('click', () => {
        if (userInput.length) {
            numberStorage.push(userInput.join(""));

            if(numberStorage.length > 1) {
                
                let result = operate(parseFloat(numberStorage.at(-2)), parseFloat(numberStorage.at(-1)), operator.at(-1));
                if (result === Infinity) {
                    appendDisplay("You broke the universe. Well done");
                }
                else {
                    appendDisplay(result);
                    numberStorage.push(result);
                    
                }  
            }
        }
        userInput = []; 
    });
}

function getClear () {

    let button = document.querySelector(".clear");
    button.addEventListener('click', () => {
        clearAll ();
    });
}

function findLastOperation () {
    let buttons = document.querySelectorAll(".nan");
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            lastOperation = button.value; 
        });
    });
}

function getBackspace () {
    let button = document.querySelector(".backspace");
    button.addEventListener('click', () => {
        if (getDisplay() !== "0") {
            userInput.pop();
            appendDisplay(userInput.join("")); 
            
            if (getDisplay() === "") {
                appendDisplay("0");
                userInput = [];
            }
        }
        
    });
}

function getChangeSign () {
    let button = document.querySelector(".changesign");
    button.addEventListener('click', () => {

        if (userInput.includes("-")) {
            userInput.shift();
            appendDisplay(userInput.join(""));
        }
        
        else if (lastOperation !== "=") {
            userInput.unshift("-"); 
            appendDisplay(userInput.join(""));
        }

        else if (getDisplay().includes("-")) {
            
            numberStorage.push(getDisplay().replace("-", ""));
            appendDisplay(numberStorage.at(-1));
        }
        
        else {
            numberStorage.push("-" + numberStorage.at(-1));
            appendDisplay(numberStorage.at(-1));
        }
    });
}

function resetAfterInfinity () {
    let button = document.querySelector(".calculator");
    
    button.addEventListener('click', () => {

        if (getDisplay() === "You broke the universe. Well done") {
            clearAll (); 
        }
    }, {capture: true});
    
    
}


//display functions

function appendDisplay (update) {
    document.querySelector(".display").textContent = update; 
}

function getDisplay () {
    return document.querySelector(".display").innerText; 
}

function clearAll () {
        userInput = []; 
        operator = [];
        numberStorage = [];
        appendDisplay("0");
        lastOperation = "";
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
    else if (operator === "%") {
        return percentage (numberA, numberB);
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

function percentage (numA, numB) {
    return (numA / 100) * numB; 
}

function divide (numA, numB) {

    return numA / numB;
    
}












