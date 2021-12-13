let values = [];
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
            add(x, y);
            break;
        case '-':
            subtract(x, y);
            break;
        case '*':
            multiply(x, y);
            break;
        case '/':
            divide(x, y);
            break;
    }
}
function populateDisplay(chars) {
    displayValue += char;
    const displayDiv = document.querySelector('div.display');
    displayDiv.textContent = displayValue;
}
function handleNumber(x) {
    // if the last item in the values arr is a "number str", add the number to the str
    const lastItemInValues = values[values.length - 1];
    const numbersRegex = /[0-9]$/;
    if (numbersRegex.test(lastItemInValues)) {
        // if the "number str" is too long, just return.  arbitrarly chose 10.
        // adjust to size of font in display as needed
        if(lastItemInValues.length === 10) return;

        // if the only number in the str is a 0, also return
        if(lastItemInValues.slice(0, 1) === '0') return;
        lastItemInValues += x;
    }

    // if the last item in the values arr is a /, *, -, or +, push the number as a new str
    const operatorRegex = /[+\-*/]$/;
    if (numbersRegex.test(lastItemInValues)) {
        values.push(x);
    }
}
function handleOperator(operator) {
    // if the last item in the values is a "number str", push the operator as a new str
    const lastItemInValues = values[values.length - 1];
    const numbersRegex = /[0-9]$/;
    if (numbersRegex.test(lastItemInValues)) {
        values.push(operator);
    }
    // if the last item.... is a /, *, -, or +, replace that item
    const operatorRegex = /[+\-*/]$/;
    if (numbersRegex.test(lastItemInValues)) {
        values[values.length - 1] = operator;
    }
}
function handleDecimal() {
    // if the last item in the values arr is a "number str", add the decimal to the str
    const lastItemInValues = values[values.length - 1];
    const numbersRegex = /[0-9]$/;
    if (numbersRegex.test(lastItemInValues)) {
        

}



    



    // render the display
    // if there are numbers in the variable, populateDisplay() 
    // add numbers to 
    // if the display size is filled up, return

}




// store numbers inputed, save into a variable when an operator is pressed
// every time a button is pressed, populate the display and render it
// save the operator into it's own variable
// pressing AC should clear 