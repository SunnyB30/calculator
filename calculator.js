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

//Event listener functions

function getNumbers () {

    let buttons = document.querySelectorAll(".number");
    
    function numberButtonClick(button) {
        if (!(button.value === "0" && getDisplay() === "0"))
        {
            if (lastOperation === "=") {
                numberStorage = [];
                increaseFontsize ();
            }
            if (userInput.length < 7) {
                userInput.push(button.value);
                appendDisplay(userInput.join(""));
            }
            
        } 
    }
              
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            numberButtonClick(button);
        });
    });

    document.addEventListener('keydown', (event) => {
        const key = event.key;
        const button = Array.from(buttons).find(btn => btn.value === key);
        if (button) {
            numberButtonClick(button);  
            button.focus();       
        }
    });

}

function getDot () {
    let button = document.querySelector(".dot");

    function handleDecimal () {
        if (userInput.includes(button.value) === false) {
            if (getDisplay() === "0" && lastOperation === "") {
                userInput.push(getDisplay());
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
    }

    button.addEventListener('click', () => {
        handleDecimal();
    });

    document.addEventListener('keydown', (event) => {
        if(event.key === ".") {
            event.preventDefault(); 
            handleDecimal();
            button.focus();
        }
    });
}

function getOperator () {
    if (userInput.at(-1) !== ".") {
        let buttons = document.querySelectorAll(".operator");
        
            function operatorClick (button) {

                operator.push(button.value);
                
                if (button.value === "%" && (userInput.length || numberStorage.length)) {
                    changeBgPercentButton (true);
                } 

                if (userInput.length) {
                    
                    numberStorage.push(userInput.join(""));

                    if (numberStorage.length > 1) {
                        changeBgPercentButton (false);
                        let result = Math.round(((operate(parseFloat(numberStorage.at(-2)), parseFloat(numberStorage.at(-1)), operator.at(-2)))*1000000))/1000000;
                        if (result === Infinity) {
                            appendDisplay("∞");
                        }
                        else {
                            if (result.toString().length > 7) {
                                let n = result.toString().length; 
                                parseFloat(result);
                                reduceFontsize (n);
                                appendDisplay(result);
                                numberStorage.push(result);
        
                            }
                            else {
                                appendDisplay(result);
                                numberStorage.push(result);
                            }       
                        }  
                    }
                }
                userInput = [];
            }
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    operatorClick(button); 
                });
            });

            document.addEventListener('keydown', (event) => {
                const key = event.key;
                const button = Array.from(buttons).find(btn => btn.value === key);
                if (button) {
                    operatorClick(button);
                    button.focus();
                }
            });
        
    }
    
}

function getEquals () {
    let button = document.querySelector(".equals");

    function equalClick () {
        if (userInput.length) {
            numberStorage.push(userInput.join(""));

            if(numberStorage.length > 1) {
                changeBgPercentButton (false);
                let result = Math.round(((operate(parseFloat(numberStorage.at(-2)), parseFloat(numberStorage.at(-1)), operator.at(-1)))*1000000))/1000000;
                if (result === Infinity) {
                    appendDisplay("∞");
                }
                else {
                    if (result.toString().length > 7) {
                        let n = result.toString().length;
                        reduceFontsize (n);
                        appendDisplay(result);
                        parseFloat(result);
                        numberStorage.push(result);

                    }
                    else {
                        appendDisplay(result);
                        numberStorage.push(result);
                    }              
                }  
            }
        }
        userInput = [];  
    }
        button.addEventListener('click', () => {
            equalClick ();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            equalClick ();
            button.focus();
        }
        
    });
}

function getClear () {

    let button = document.querySelector(".clear");
    
    button.addEventListener('click', () => {
        clearAll ();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === "Delete") {
            event.preventDefault(); 
            clearAll(); 
            button.focus();
        }
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
    
    function handleBackSpace () {
        if (getDisplay() !== "0") {
            userInput.pop();
            appendDisplay(userInput.join("")); 
            
            if (getDisplay() === "") {
                increaseFontsize ();
                appendDisplay("0");
                userInput = [];
            }
        }
    }

    button.addEventListener('click', () => {
        handleBackSpace(); 
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === "Backspace") {
            event.preventDefault(); 
            handleBackSpace();
            button.focus(); 
        }
    }); 


}

function getChangeSign () {
    let button = document.querySelector(".changesign");

    function changeSign () {
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
    }

    button.addEventListener('click', () => {
        changeSign (); 
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === "c") {
            event.preventDefault(); 
            changeSign();
            button.focus(); 
        }
    });
}

function resetAfterInfinity () {
    let button = document.querySelector(".calculator");
    
    button.addEventListener('click', () => {

        if (getDisplay() === "∞") {
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
        increaseFontsize ();
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

//other 

function reduceFontsize (n) {
    let reducingFactor = (1) /(parseFloat(n/7)) * 100; 
    let newreducingFactor = reducingFactor.toString() + "px";
    document.getElementById("display").style.fontSize = newreducingFactor;
}

function increaseFontsize () {
    document.getElementById("display").style.fontSize = "100px";
}

function changeBgPercentButton (toggle) {
    if (toggle === true) {
        document.querySelector(".percent").style.color = "#39ff14"; 
    }

    else {
        document.querySelector(".percent").style.color = "rgb(1, 205, 205)";
    }
    
}











