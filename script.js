const MAX_LENGTH = 9;
const OPERATIONS = { divide: '÷', multiply: '×', add: '+', subtract: '-', equals: '=' };
let memory = [];
let history = [];

// Helper function to create element
const createElement = (classList = [], onClick, content, id = null) => {
  const element = document.createElement('button');
  element.classList.add(...classList);
  if (id) {
    element.id = id;
  }
  element.addEventListener('click', () => onClick());
  element.textContent = content;
  return element;
};

// Mount components
const mountComponents = () => {
  let number = 7; // First digit to appear
  const buttons = document.querySelector('.buttons');
  Object.entries(OPERATIONS).forEach(([key, value]) => {
    buttons.appendChild(createElement(['operations'], selectOperator(value), value, key));

    if (number > 0) {
      for (let i = 0; i < 3; i++) {
        buttons.appendChild(createElement(['number'], appendToDisplay(number + i), number + i));
      }
      number -= 3;
    } else if (key === 'equals') {
      return;
    } else {
      buttons.appendChild(createElement(['number', 'zero'], appendToDisplay('0'), 0));
      buttons.appendChild(createElement(['number'], appendToDisplay('.'), '.'));
    }
  });
};

const appendToDisplay = (char) => {
  return () => {
    const prevOperator = document.querySelector('.active-op');
    let display = document.querySelector('.result');
    document.querySelector('.clear').innerHTML = 'C';

    if (prevOperator) {
      display.innerHTML = '';
    }

    if (display.innerHTML.length < MAX_LENGTH) {
      // Only allow one decimal in each input
      if (char == '.') {
        if (display.innerHTML.includes('.')) {
          return;
        }
      }

      if (prevOperator) {
        if (memory[0] === '') {
          memory[0] = 0;
        }
        if (prevOperator.id !== 'equals') {
          memory.push(prevOperator.innerHTML);
          history.push(prevOperator.innerHTML);
        }
        prevOperator.classList.remove('active-op');
      }
      display.innerHTML += char;
      updateHistory();
      adjustFontSize();
    }
  };
};

function updateHistory() {
  if (history.length === 0) {
    return;
  }
  let historyElement = document.querySelector('.history');
  // Convert history array [a,b,c,d] -> 'a b c d' form
  historyElement.textContent = history.join(' ');
}

function adjustFontSize() {
  const display = document.querySelector('.result');
  let computedStyle = window.getComputedStyle(display);
  let fontSize = parseFloat(computedStyle.fontSize) || defaultFontSize;
  const maxLength = Math.round(fontSize / 12);

  if (display.innerHTML.length >= maxLength) {
    fontSize -= fontSize / 10;
  }
  display.style.fontSize = fontSize + 'px';
}

function clearDisplay() {
  let historyElement = document.querySelector('.history');
  let display = document.querySelector('.result');

  // Clear once: just clear the input
  if (display.innerHTML.length >= 1) {
    display.innerHTML = '';
    display.style.fontSize = '3.5rem';
    document.querySelector('.clear').innerHTML = 'AC';
  } else {
    // Clear twice in row: clear everything
    historyElement.innerHTML = '';
    history = [];
    memory = [];
    let activeOperation = document.querySelector('.active-op');
    if (activeOperation) {
      activeOperation.classList.remove('active-op');
    }
  }
}

function switchSign() {
  const display = document.querySelector('.result');
  if (display.innerHTML.charAt(0) == '-') {
    display.innerHTML = display.innerHTML.slice(1);
  } else {
    display.innerHTML = '-' + display.innerHTML;
  }
}

function percentage() {
  const display = document.querySelector('.result');
  let integer = parseFloat(display.innerHTML);

  let percentage = (integer || 0) / 100;

  if (String(percentage).length <= MAX_LENGTH) {
    display.innerHTML = percentage;
  }
}

const getKeyFromValue = (value) => {
  return Object.keys(OPERATIONS).find((key) => OPERATIONS[key] === value);
};

const selectOperator = (operator) => {
  return () => {
    let operand = document.querySelector('.result');

    // Toggle prev off, and curr operator active
    const currentActiveOp = document.querySelector('.active-op');
    if (currentActiveOp) {
      currentActiveOp.classList.remove('active-op');
    } else {
      memory.push(operand.innerHTML);
      history.push(operand.innerHTML);
    }

    // Convert result of memory array [num, op, num] to [result, newOp]
    if (memory.length === 3) {
      const result = calculate(memory[0], memory[2], memory[1]);
      memory = [result];
      operand.innerHTML = result;
    }

    const operatorElement = document.getElementById(getKeyFromValue(operator));
    operatorElement.classList.add('active-op');

    updateHistory();
  };
};

function calculate(op1, op2, operator) {
  op1 = parseFloat(op1);
  op2 = parseFloat(op2);

  switch (operator) {
    case '+':
      return op1 + op2;
    case '-':
      return op1 - op2;
    case '×':
      return op1 * op2;

    case '÷':
      return op1 / op2;
  }
}

document.addEventListener('keydown', function (event) {
  const key = event.key;
  if (/[0-9]/.test(key)) {
    appendToDisplay(key)();
  } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === 'Enter') {
    switch (key) {
      case '+':
        selectOperator('+')();
        break;
      case '-':
        selectOperator('-')();
        break;
      case '*':
        selectOperator('×')();
        break;
      case '/':
        selectOperator('÷')();
        break;
      case 'Enter':
        selectOperator('=')();
        break;
    }
  } else if (key === 'c') {
    clearDisplay();
  } else if (key === '%') {
    percentage();
  } else if (key === '.') {
    appendToDisplay('.')();
  }
});

mountComponents();
