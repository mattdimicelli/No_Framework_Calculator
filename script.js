'use strict';

(function applicationWrapper() {

    let arg1 = '0';
    let arg2;
    let operator;
    let result;
    let repeatWithSameArgAndOperator;
    let repeatValue;
    let lastBtnPressWasNumberOrDecimalPoint = true;

    initializeApplication();

    function initializeApplication() {
        let btns = Array.from(document.querySelectorAll('button'));
        addClickEventListenersToButtons();
        populateDisplay(arg1);
        document.addEventListener('keydown', keyboardHandler);
        document.addEventListener('keyup', keyboardHandler);

        function addClickEventListenersToButtons() {
            for (let btn of btns) {
                const btnValue = btn.dataset.value;
                const numbers = ['0','1', '2', '3', '4', '5', '6', '7', '8', '9'];
                const operators = ['+', '-', '*', '/'];
                if (numbers.includes(btnValue)) {
                    btn.addEventListener('click', function() {
                        handleNumber(btnValue);
                    });
                }
                else if (operators.includes(btnValue)) {
                    btn.addEventListener('click', function() {
                        handleOperator(btnValue);
                    })
                }
                else if (btnValue === '.') {
                    btn.addEventListener('click', handleDecimal);
                } 
                else if (btnValue === '=') {
                    btn.addEventListener('click', handleEquals);
                } 
                else if (btnValue === 'AC') {
                    btn.addEventListener('click', handleClear);
                } 
                else if (btnValue === 'Backspace') {
                    btn.addEventListener('click', handleBackspace);
                } 

                function handleNumber(x) {
                    lastBtnPressWasNumberOrDecimalPoint = true;
            
                    result = undefined;
                    if (typeof arg1 === 'undefined') {
                        arg1 = x;
                        populateDisplay(arg1);
                    }
                    else if (typeof operator === 'undefined') {
                        modifyArg(1, x);
                        populateDisplay(arg1);
                    }
                    else if (typeof arg2 === 'undefined') {
                        arg2 = x;
                        populateDisplay(arg2);
                    }
                    else {
                        modifyArg(2, x);         
                        populateDisplay(arg2);                                              
                    }
                    
                    console.log({
                        arg1,
                        arg2,
                        operator,
                        result,
                        repeatWithSameArgAndOperator,
                        repeatValue
                    });
            
                    function modifyArg(operand, value) {
                        if (operand === 1) {
                            /* if arg1 is already 20 chars long, do nothing (to
                            avoid storing numbers that are too long) */
                            if(arg1.length === 20) return;
                            else if(arg1 === '0') arg1 = value;
                            else arg1 += value; 
                        }
                        else if (operand === 2) {
                            /* if arg2 is already 20 chars long, do nothing (to 
                            avoid storing numbers that are too long) */
                            if(arg2.length === 20) return;
                            else if(arg2 === '0') arg2 = value;
                            else arg2 += value;
                        }
                    }
                }
            
                function handleOperator(newOp) {
                    lastBtnPressWasNumberOrDecimalPoint = false;
            
                    if (typeof result !== 'undefined') {  
                        arg1 = result;
                        result = undefined;
                        operator = newOp;
                    }
                    if (typeof arg1 === 'undefined') {
                        /* an operator can't do anything by itself, it needs an
                        operand.... so do nothing */
                        return;
                    }
                    else if (typeof arg2 === 'undefined') {
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
            
                    console.log({
                        arg1,
                        arg2,
                        operator,
                        result,
                        repeatWithSameArgAndOperator,
                        repeatValue
                    });
                }
            
                function handleDecimal() {
                    lastBtnPressWasNumberOrDecimalPoint = true;
                    if (typeof arg1 === 'undefined') {
                        arg1 = '.';
                        populateDisplay(arg1);
                    }
                    else if (typeof operator === 'undefined') {
                        if (arg1.includes('.') || (arg1.length >= 19)) {
                            /* if arg1 is already 19 chars long, there is no 
                            room for a decimal point and another digit, so don't
                            do anything.  Also, if arg1 already has a decimal
                            point, it can't accept another */
                            return;
                        }
                        arg1 += '.';
                        populateDisplay(arg1); 
                    }
                    else if (typeof arg2 === 'undefined') {
                        arg2 = '.';
                        populateDisplay(arg2);
                    }
                    else if (arg2.includes('.') || (arg2.length >= 19)) {
                        return;
                    }
                    else {
                        arg2 += '.';
                        populateDisplay(arg2);
                    }
                } 
            
                function handleEquals() {
                    lastBtnPressWasNumberOrDecimalPoint = false;
            
                    if (typeof arg1 === 'undefined') {
                        repeatWithSameArgAndOperator = false;
                        repeatValue = undefined;
                        return;
                    }
                    else if (typeof operator === 'undefined') {
                        /* continue to show the previously entered number on the
                        screen, but delete arg1 so that user can "start fresh"
                        by entering a new arg1 */
                        arg1 = undefined;
                        repeatWithSameArgAndOperator = false;
                        repeatValue = undefined;
                    }
                    else if (typeof arg2 === 'undefined') {
                        /* if there is one number in the equation and the user
                        has already entered an operator, but then hits the equals
                        button, perform the operation using the same number for 
                        arg2 as for arg1.  Ex: User hits "5", then "+", followed
                        by "=".  The calculator will perform 5 + 5 and show the 
                        result. If the user presses equals again, the calculator
                        will add 5 to the result of the previous equation, and it 
                        will show 15.  User presses equals again, will show 20. 
                        Etc, etc.  */
                        if (!repeatWithSameArgAndOperator) {
                            repeatValue = arg1;
                            result = calculate();
                            populateDisplay(result);
                            arg1 = result;
                            repeatWithSameArgAndOperator = true;
                            /* this flag will set the calculator to be in "repeat
                            mode", which performs the action described in the 
                            above comment every time the equals button is 
                            pressed, until the user breaks the pattern of 
                            repeatedly pressings equals, at which point the flag
                            will be set to false, and the calculator will no 
                            longer be in "repeat mode" */
                        }
                        else if (repeatWithSameArgAndOperator) {
                            result = calculate();
                            populateDisplay(result);
                            arg1 = result;
                        }
                    }
                    else {
                        result = calculate();
                        populateDisplay(result);
                        operator = undefined;
                        arg1 = undefined;
                        arg2 = undefined;
                        repeatValue = false;
                        repeatValue = undefined;
                    }
                    console.log({
                        arg1,
                        arg2,
                        operator,
                        result,
                        repeatWithSameArgAndOperator,
                        repeatValue
                    });
                }
            
                function handleClear() {
                    lastBtnPressWasNumberOrDecimalPoint = false;
            
                    arg2 = undefined;
                    operator = undefined;
                    result = undefined;
                    repeatWithSameArgAndOperator = undefined;
                    repeatValue = undefined;
            
                    arg1 = '0';
                    populateDisplay(arg1);
            
                }
            
                function handleBackspace(){
                    if (lastBtnPressWasNumberOrDecimalPoint) {
                        if (typeof arg2 !== 'undefined') {
                            if (arg2.length > 1) {
                                arg2 = arg2.slice(0, (arg2.length - 1));
                                populateDisplay(arg2);
                            }
                            else {
                                arg2 = undefined;
                                populateDisplay('');
                            }
                        }
                        else if (typeof arg1 !== "undefined") {
                            if (arg1.length > 1) {
                                arg1 = arg1.slice(0, (arg1.length - 1));
                                populateDisplay(arg1);
                            }
                            else {
                                arg1 = undefined;
                                populateDisplay('');
                            }
                        }
                    }
                    else return;
                }
            }
        }

        function keyboardHandler(e) {
            const key = e.key;
            if (key === 'Escape' || key === 'Delete') {
                let clearBtn = btns.find(btn => btn.dataset.value === 'AC');
                if (e.type === 'keydown') {
                    clearBtn.classList.add('active');
                    clearBtn.click();
                }
                else if (e.type === 'keyup') clearBtn.classList.remove('active');
            }
            else if (key === 'Enter') {
                let equalsBtn = btns.find(btn => btn.dataset.value === '=');
                if (e.type === 'keydown') {
                    equalsBtn.classList.add('active');
                    equalsBtn.click();
                }
                else if (e.type === 'keyup') equalsBtn.classList.remove('active');
            }
            else {
                const correspondingBtn = btns.find(btn => btn.dataset.value === key);
                if (correspondingBtn) {
                    if (e.type === 'keydown') {
                        correspondingBtn.classList.add('active');
                        correspondingBtn.click();
                    }
                    else if (e.type === 'keyup') {
                        correspondingBtn.classList.remove('active');
                    } 
                }
            }
        }
    }

    function calculate() {
        let result;
        if (operator === '/' && arg2 === '0') result = 'EXPLODES';
        else if (repeatValue) result = operate(+arg1, +repeatValue, operator);
        else result = operate(+arg1, +arg2, operator);
        return result.toString();

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
        }
    }

    function populateDisplay(value) {
        const displayDiv = document.querySelector('div.display');
        displayDiv.textContent = formatToMax20Chars(value);
        
        function formatToMax20Chars(str) {
            if (str.length > 20 && ((Number(str) > 1e19))) {
                // if the number is huge, display it in scientific notation
                str = Number(str).toExponential(14);
                /* the scientific notation will show only 14 digits after the 
                decimal point, so that at the most, the result (string) will be 
                a max of twenty characters long, such as 9.999999999989e+24 */
            }
            else if (str.length > 20) {
                /* else, if the string is too long b/c the number has too many 
                decimal places, reduce the string to 20 chars max */
                str = str.slice(0, 20);
                
                if (str[19] === '.') str = str.slice(0,19);
                /* if the last char would be a decimal point, cut off that 
                decimal point as well */
            }
            return str;
        }
    }
})();
    


