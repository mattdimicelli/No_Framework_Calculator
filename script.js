let values = ['0'];
let buttons = document.querySelectorAll('button');
for (let button of buttons) {
    const buttonValue = button.dataset.value;
    const numbers = ['0','1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const operators = ['+', '-', '*', '/'];
    if (numbers.includes(buttonValue)) {
        button.addEventListener('click', function() {
            handleNumber(buttonValue);
        });
    }
    else if (buttonValue === '.') {
        button.addEventListener('click', handleDecimal);
    }
    else if (operators.includes(buttonValue)) {
        button.addEventListener('click', function() {
            handleOperator(buttonValue);
        })
    } 
}
function add(x, y) {
    return x + y;
}
function subtract(x, y) {
    return x-y;
}
function multiply(x, y) {
    return x * y;
}
function divide(x, y) {
    return x / y;
}
function operate(x, y, operator) {
    switch (operator) {
        case '+':
            return add(x, y);
            break;
        case '-':
            return subtract(x, y);
            break;
        case '*':
            return multiply(x, y);
            break;
        case '/':
            return divide(x, y);
            break;
    }
}
function calculate() {
    console.log(values);
    const lastValue = values[values.length - 1];
    const secondLastValue = values[values.length - 2];
    const thirdLastValue = values[values.length - 3];
    const fourthLastValue = values[values.length -4];
    const operators = ['-', '+', '*', '/'];
    // if the last value is an operator which is preceded by number, operator, number (three items in a row), display the result
    if (operators.includes(lastValue) && (typeof secondLastValue !== 'undefined') && (typeof thirdLastValue !== 'undefined') && (typeof fourthLastValue !== 'undefined')) {
        const result = operate(Number(fourthLastValue), Number(secondLastValue), thirdLastValue);
        resultStr = result.toString();
        values = [resultStr, lastValue];  //the values arr only holds strs
    }
}
function manageValues() {}

function populateDisplay() {
    const displayDiv = document.querySelector('div.display');
    const operators = ['-', '+', '*', '/'];
    let displayValue;
    if(operators.includes(values[values.length - 1])) {  // if the last item in the values arr is an operator...
        displayValue = roundTo7Places(values[values.length - 2]); // don't display the operator, only display a number
    }
    else displayValue = roundTo7Places(values[values.length -1]); 
    displayDiv.textContent = displayValue;
    
    function roundTo7Places(x) {
        return Math.round(x  * 10000000) / 10000000;
    }
}

function handleNumber(x) {
    // if the last item in the values arr is a "float str", add the number to the str
    const lastItemInValues = values[values.length - 1];
    const floatRegex = /[0-9\.]$/;
    if (floatRegex.test(lastItemInValues)) {
        // if the "number str" is too long, just return.  arbitrarly chose 10.
        // adjust to size of font in display as needed
        if(lastItemInValues.length === 10) return;

        // if there is only one char in the str which is a 0, replace that number
        else if(lastItemInValues === '0') {
            values[values.length - 1] = x;
        }

        else values[values.length - 1] += x;
    }

    // if the last item in the values arr is a /, *, -, or +, push the number as a new str
    const operatorRegex = /[+\-*\/]$/;
    if (operatorRegex.test(lastItemInValues)) {
        values.push(x);
    }
    while (values.length > 4) values.shift();
    calculate();
    populateDisplay();
}
function handleOperator(operator) {
    // if the last item in the values is a "number str", push the operator as a new str
    const lastItemInValues = values[values.length - 1];
    const numbersRegex = /[0-9]$/;
    if (numbersRegex.test(lastItemInValues)) {
        values.push(operator);
    }
    // if the last item.... is a / * - + or . replace that item
    const operatorAndDecimalRegex = /[+\-*\/\.]$/;
    if (operatorAndDecimalRegex.test(lastItemInValues)) {
        values[values.length - 1] = operator;
    }
    while (values.length > 4) values.shift();
    calculate();
    populateDisplay();
}
function handleDecimal() {
    // if the last item in the values arr is a "number str", add the decimal to the str
    const lastItemInValues = values[values.length - 1];
    const numbersRegex = /[0-9]$/;
    if (numbersRegex.test(lastItemInValues)) {
        values[values.length - 1] += '.';
    }
    // if the last item in the values arr is a /, *, -, or +, push a new str to the arr that starts with '0.'
    const operatorRegex = /[+\-*\/]$/;
    if (operatorRegex.test(lastItemInValues)) {
        values.push('0.');
    }
    // if the last item in the values arr is a decimal point, return
    const decimalRegex = /\.$/;
    if (decimalRegex.test(lastItemInValues)) return;
    while (values.length > 4) values.shift();
    calculate();
    populateDisplay();
}
function handleEquals() {
    // if there's only a number in values, and it ends with a decimal point, 
    // if there's only a nunmber in values, return
    if (value.length === 1 && )
    // if there's a number and an operator, return
    // if there's a number, an operator, and another number, calculate and display;
}



    



    // render the display
    // if there are numbers in the variable, populateDisplay() 
    // add numbers to 
    // if the display size is filled up, return






// store numbers inputed, save into a variable when an operator is pressed
// every time a button is pressed, populate the display and render it
// save the operator into it's own variable
// pressing AC should clear 