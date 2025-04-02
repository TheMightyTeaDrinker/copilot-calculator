// Getting all the keys from calculator
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator-keys');
const display = calculator.querySelector('.calculator-screen');

// Variables to keep track of the current state
let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

keys.addEventListener('click', (event) => {
    const { target } = event;
    const { value } = target;

    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'all-clear':
            resetCalculator();
            break;
        default:
            inputDigit(value);
    }

    updateDisplay();
});

function updateDisplay() {
    display.value = displayValue;
}

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);

    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue === null) {
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue, value, operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;
}

function calculate(first, second, operator) {
    if (operator === '+') {
        return first + second;
    } else if (operator === '-') {
        return first - second;
    } else if (operator === '*') {
        return first * second;
    } else if (operator === '/') {
        return first / second;
    }

    return second;
}

function inputDigit(digit) {
    if (waitingForSecondValue) {
        displayValue = digit;
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function inputDecimal(dot) {
    if (!displayValue.includes(dot)) {
        displayValue += dot;
    }
}

function resetCalculator() {
    displayValue = '0';
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
}
