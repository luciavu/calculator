const MAX_LENGTH = 9;

function appendToDisplay(char) {
    const display = document.querySelector(".result");
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
    console.log(fontSize);
    display.style.fontSize = fontSize + 'px';
};

function clearDisplay() {
    const display = document.querySelector(".result");
    display.innerHTML = "";
    display.style.fontSize = '3.5rem';
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
    console.log(integer, percentage, String(percentage).length);
    if (String(percentage).length <= MAX_LENGTH) {
        display.innerHTML = percentage;
    }
}

function calculate(operator) {
    let operatorButton = document.querySelector(`.${operator}`);
};
