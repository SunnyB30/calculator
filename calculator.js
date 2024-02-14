operate(); 

function operate () {
    
    let numberA = 1;
    let numberB = 2;
    let operator = "/";
    
    if (operator === "+") {
        add(numberA, numberB);
    }
    else if (operator === "-") {
        subtract(numberA, numberB);
    }
    else if (operator === "*") {
        multiply(numberA, numberB);
    }
    else {
        divide (numberA, numberB);
    }
}


function add (numA, numB) {
    console.log(numA + numB);
}

function subtract (numA, numB) {
    console.log(numA - numB);
}

function multiply (numA, numB) {
    console.log(numA * numB);
}

function divide (numA, numB) {
    console.log(numA / numB);
}