const MAX_LENGTH = 9;

function appendToDisplay(char) {
    const display = document.querySelector(".result");
    if (display.innerHTML.length < MAX_LENGTH) {
        display.innerHTML += char;
        adjustFontSize();
    }
}

function adjustFontSize() {
    const display = document.querySelector(".result");
    let computedStyle = window.getComputedStyle(display);
    let fontSize = parseFloat(computedStyle.fontSize) || defaultFontSize;
    const maxLength = Math.round(fontSize/12);

    if (display.innerHTML.length >= maxLength) {
        fontSize -= fontSize/10
    }
    console.log(fontSize);
    display.style.fontSize = fontSize + 'px'
}

function clearDisplay() {
    const display = document.querySelector(".result");
    display.innerHTML = "";
    display.style.fontSize = '3.5rem'
}

