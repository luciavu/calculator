const MAX_LENGTH = 9;
let sum = 0;
let totalHistory = 0;

function appendToDisplay(char) {
    document.querySelector(".clear").innerHTML = 'C';
    
    let display = document.querySelector(".result");
    if (display.innerHTML == sum) {
        display.innerHTML = "";
    }
    
    if (display.innerHTML.length < MAX_LENGTH) {
        // Only allow one decimal in each input
        if (char == '.') {
            if (display.innerHTML.includes('.')) {
                return
            };
        };
        display.innerHTML += char;
        adjustFontSize();
    };
};

function adjustFontSize() {
    const display = document.querySelector(".result");
    let computedStyle = window.getComputedStyle(display);
    let fontSize = parseFloat(computedStyle.fontSize) || defaultFontSize;
    const maxLength = Math.round(fontSize/12);

    if (display.innerHTML.length >= maxLength) {
        fontSize -= fontSize/10;
    };
    display.style.fontSize = fontSize + 'px';
};

function clearDisplay() {
    let history = document.querySelector(".history");
    let display = document.querySelector(".result");

    // Clear once: just clear the input
    if (display.innerHTML.length >= 1) {
        display.innerHTML = "";
        display.style.fontSize = '3.5rem';
        document.querySelector(".clear").innerHTML = 'AC';
    } else { // Clear twice in row: clear everything
        history.innerHTML = "";
        sum = 0;
        totalHistory = 0;
        prevOperator = "";
        let activeOperation = document.querySelector('.active');
        if (activeOperation) {
            activeOperation.classList.remove('active');
        };
    };
};

function switchSign() {
    const display = document.querySelector(".result");
    if (display.innerHTML.charAt(0) == '-') {
        display.innerHTML = display.innerHTML.slice(1);
    } else {
        display.innerHTML = '-' + display.innerHTML;
    };
};

function percentage() {
    const display = document.querySelector(".result");
    let integer = parseFloat(display.innerHTML);
    let percentage = integer/100;
    
    if (String(percentage).length <= MAX_LENGTH) {
        display.innerHTML = percentage;
    };
};


function selectOperator(operator) {
    let operand = document.querySelector(".result");
    let history = document.querySelector(".history");
    let prevOperator = document.querySelector('.active');
    
    // Update, store history - operand
    history.innerHTML += operand.innerHTML;
    const historyLen = history.innerHTML.length;
    if(!historyLen) {
        return;
    }
    if (prevOperator) {
        if (prevOperator.id == 'equals') {
            history.innerHTML = sum;
        };
    };

    // If last input operator, switch operator
    if (history.innerHTML.charAt(historyLen - 1) == " ") {
        history.innerHTML = history.innerHTML.substring(0, historyLen - 3) + ` ${operator} `;
    } else { // Else add operator
        // If first operation
        if (!(history.innerHTML.includes('+') || history.innerHTML.includes('-') ||
            history.innerHTML.includes('÷') || history.innerHTML.includes('×'))) {
                if (!totalHistory) {
                    sum = operand.innerHTML;
                }
        } else {
            // Update operand
            const op2 = operand.innerHTML;
            sum = calculate(sum, op2, prevOperator);
            totalHistory += sum;
        };
        history.innerHTML += ` ${operator} `;
    };

    if (operator != '=') {
        operand.innerHTML = sum;
    };
};

function calculate(op1, op2, operator) {
    op1 = parseFloat(op1);
    op2 = parseFloat(op2);
    console.log('sum', sum);
    console.log(op1, operator.id, op2)

    switch(operator.id) {
        case 'add':
            return op1 + op2;
        
        case 'minus':
            return op1 - op2;

        case 'multiply':
            return op1 * op2;
        
        case 'divide':
            return op1 / op2;
    };
};

function setActive(operatorId) {
    let display = document.querySelector('.result');
    let prev = document.querySelector('.active');

    if (operatorId == 'equals') {
        display.innerHTML = sum;
    };
    
    if (prev) {
        prev.classList.remove('active');
    };
    document.getElementById(operatorId).classList.add('active');
};