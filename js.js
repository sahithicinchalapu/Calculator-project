const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

function allclear() {
  display.value = '';
}

function clearLast() {
  display.value = display.value.slice(0, -1);
}

function appendNum(number) {
  display.value += number;
}

function appendOp(operator) {
  display.value += operator;
}

function handleParentheses() {
  const currentValue = display.value;
  const lastChar = currentValue[currentValue.length - 1];
  
  // Count open and closed parentheses
  const openCount = (currentValue.match(/\(/g) || []).length;
  const closeCount = (currentValue.match(/\)/g) || []).length;

  if (openCount > closeCount) {
    // More open parentheses, so add a closing one
    display.value += ')';
  } else {
    // Equal number of open and closed parentheses, or more closed ones
    // Add an opening parenthesis, but check if we need to add a multiplication sign
    if (lastChar && '0123456789)'.includes(lastChar)) {
      display.value += '*';
    }
    display.value += '(';
  }
}

function calculateResult() {
  try {
    const result = Function('"use strict";return (' + display.value + ')')();
    if (isNaN(result) || !isFinite(result)) {
      throw new Error('Invalid calculation');
    }
    display.value = result;
  } catch (error) {
    display.value = 'Error: ' + error.message;
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const buttonValue = button.textContent;

    if (buttonValue === 'AC') {
      allclear();
    } else if (buttonValue === 'C') {
      clearLast();
    } else if (buttonValue === '=') {
      calculateResult();
    } else if (buttonValue === '()') {
      handleParentheses();
    } else if (['+', '-', '*', '/', '%'].includes(buttonValue)) {
      appendOp(buttonValue);
    } else {
      appendNum(buttonValue);
    }
  });
});
