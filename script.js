let arg1;
let arg2;
let operator;
let result;
let buttons = document.querySelectorAll('button');
const integerPointRegex = /[0-9\.]$/;
const operatorRegex = /^[+\-\*\/]$/;
const integerRegex = /^[0-9]+$/;
const numbersRegex = /^([0-9]+\.?[0-9]*|\.[0-9]+)$/;
const endsWithDecimalRegex = /\.$/;

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
    else if (buttonValue === '=') {
        button.addEventListener('click', handleEquals);
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
   let result = operate(+arg1, +arg2, operator);
   return result.toString();
}

function populateDisplay(value) {
    const displayDiv = document.querySelector('div.display');
    displayDiv.textContent = formatToMax10Chars(value);
    
    function formatToMax10Chars(str) {
        if (str.length > 10 && ((Number(str) > 1e9))) {
            // if the number is huge, display it in scientific notation
            str = Number(str).toExponential();
        }
        else if (str.length > 10) {
            // else, if the string is too long b/c the number has too many decimal
            // places, reduce the string to 10 chars max
            str = str.slice(0, 10);
            // but if that means that the last char would be a decimal point, 
            // cut off that decimal point as well
            if (str[9] === '.') str = str.slice(0,9);
        }
        return str;
    }
}

function handleNumber(x) {
    if (typeof arg1 === 'undefined') {
        arg1 = x;
        populateDisplay(arg1);
    }
    else if (typeof operator === 'undefined') {
        modify(1, x);
        populateDisplay(arg1);
    }
    else if (typeof arg2 === 'undefined') {
        arg2 = x;
        populateDisplay(arg2);
    }
    else {
        modify(2, x);         
        populateDisplay(arg2);                                              
    }
    
    console.log(arg1, arg2, operator);

    function modify(operand, value) {
        if (operand === 1) {
            /* if arg1 is already 10 chars long, do nothing (to avoid storing
            numbers that are too long) */
            if(arg1.length === 10) return;
            else if(arg1 === '0') arg1 = value;
            else arg1 += value; 
        }
        else if (operand === 2) {
            /* if arg2 is already 10 chars long, do nothing (to avoid storing
            numbers that are too long) */
            if(arg2.length === 10) return;
            else if(arg2 === '0') arg2 = value;
            else arg2 += value;
        }
    }
}
    
    // if (typeof arg1 === 'undefined') {
    //     arg1 = x;
    //     populateDisplay(arg1);
    // }
    // else {
    //     if (typeof operator === 'undefined') {
    //         modify(1, x);
    //         populateDisplay(arg1);
    //     }
    //     else {
    //         if (typeof arg2 === 'undefined') {
    //             arg2 = x;
    //         }
    //         else {
    //             modify(2, x);                                                       
    //         }
    //         populateDisplay(arg2);
    //     }
    // }

    


function handleOperator(newOp) {
    if (typeof arg1 === 'undefined') {
        // an operator can't do anything by itself, it needs an operand
        return;
    }
    else if (typeof arg2 === 'undefined') {
        /* the operator in memory will be overwritten by newOp (if the user
        had previously input an operator), or it will be "initialized" by 
        newOp (if the user hadn't yet selected on of the operators for the
        equation) */
        operator = newOp;
    }
    else {
        // there is an arg2 already defined
        result = calculate();
        populateDisplay(result);
        operator = newOp;
        arg1 = result;
        arg2 = undefined;
    }

    console.log(arg1, arg2, operator)
    // if (typeof arg1 === 'undefined') {
    //     // an operator can't do anything by itself, it needs an operand
    //     return;
    // }
    // else {
    //     if (typeof arg2 === 'undefined') {
    //         /* the operator in memory will be overwritten by newOp (if the user
    //         had previously input an operator), or it will be "initialized" by 
    //         newOp (if the user hadn't yet selected on of the operators for the
    //         equation) */
    //         operator = newOp;
    //     }
    //     else {
    //         // there is an arg2 already defined
    //         result = calculate();
    //         populateDisplay(result);
    //         operator = newOp;
    //         arg1 = result;
    //         arg2 = undefined;
    //     }
    // }
    // console.log(arg1, arg2, operator)
}

function handleDecimal() {
    if (typeof arg1 === 'undefined') {
        arg1 = '.';
        populateDisplay(arg1);
    }
    else if (typeof operator === 'undefined') {
        if (arg1.includes('.') || (arg1.length >= 9)) {
            /* if arg1 is already 9 chars long, there is no room for 
            a decimal point and another digit, so don't do anything.  Also,
            if arg1 already has a decimal point, it can't accept another */
            return;
        }
        arg1 += '.';
        populateDisplay(arg1); 
    }
    else if (typeof arg2 === 'undefined') {
        arg2 = '.';
        populateDisplay(arg2);
    }
    else if (arg2.includes('.') || (arg2.length >= 9)) {
        return;
    }
    else {
        arg2 += '.';
        populateDisplay(arg2);
    }
} 

    
    // if (typeof arg1 === 'undefined') {
    //     arg1 = '.';
    //     populateDisplay(arg1);
    // }
    // else {
    //     if (typeof operator === 'undefined') {
    //        if (arg1.includes('.') || (arg1.length >= 9)) {
    //            /* if arg1 is already 9 chars long, there is no room for 
    //             a decimal point and another digit, so don't do anything.  Also,
    //             if arg1 already has a decimal point, it can't accept another */
    //            return;
    //        }
    //        else {
    //            arg1 += '.';
    //            populateDisplay(arg1);
    //        } 
    //     }
    //     else {
    //         if (typeof arg2 === 'undefined') {
    //             arg2 = '.';
    //             populateDisplay(arg2);
    //         }
    //         else {
    //             if (arg2.includes('.') || (arg2.length >= 9)) {
    //                 return;
    //             }
    //             else {
    //                 arg2 += '.';
    //                 populateDisplay(arg2);
    //             }
    //         } 
    //     }
    // }


function handleEquals() {
    if (typeof arg1 === 'undefined') {
        return;
    }
    else if (typeof operator === 'undefined') {
        /* continue to show the entered number on the screen, but delete arg1
        so that user can "start from the beginning" */
        arg1 = undefined;
    }
    else if (typeof arg2 === 'undefined') {
        /* if there is one number in the equation and the user has already 
        entered an operator, but then hits the equals button, perform the operation
        using the same number for arg2 as for arg1.  Ex '5 * ='   =>   '5 * 5'   . */
        arg2 = arg1;
        result = calculate();
        populateDisplay(result);
        arg1 = result;
    }
    else {
        result = calculate();
        populateDisplay(result);
        operator = undefined;
        arg1 = undefined;
        arg2 = undefined;
    }
    console.log(arg1, arg2, operator)

}



    


