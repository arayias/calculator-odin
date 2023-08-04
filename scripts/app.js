const state = {
  lhs : null,
  rhs : null,
  operator : '',
  result : 0
}

const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const display = document.querySelector('.screen');
const clearButton = document.querySelector('#clear');

const round = (number) => {
  return (Math.round(number * 10000000) / 10000000).toFixed(5);
}
const add = (lhs, rhs) => round(lhs + rhs);
const subtract = (lhs, rhs) => round(lhs - rhs);
const multiply = (lhs, rhs) => round(lhs * rhs);
const divide = (lhs, rhs) => {
  if(rhs === 0) {
    return 'ERROR';
  }
  return round(lhs / rhs);
}

const clear = () => {
  state.lhs = null;
  state.rhs = null;
  state.operator = '';
  state.result = 0;
}

const operate = (operator, lhs, rhs) => {
  switch(operator) {
    case '+':
      return add(lhs, rhs);
    case '-':
      return subtract(lhs, rhs);
    case '*':
      return multiply(lhs, rhs);
    case '/':
      return divide(lhs, rhs);
    case '=':
      const currentOperator = state.operator;
      state.operator = '';
      return operate(currentOperator, parseFloat(state.lhs), parseFloat(state.rhs));
    default:
      return 'ERROR';
  }
}

numberButtons.forEach(button => {
  button.addEventListener('click', () => {

    if(state.operator === '') {
      if(state.lhs === null) {
        state.lhs = button.innerText;
      } else {
        state.lhs.includes('.') && button.innerText === '.' ? null : state.lhs += button.innerText;
      }
    } else {
      if(state.rhs === null) {
        state.rhs = button.innerText;
      } else {
        state.rhs.includes('.') && button.innerText === '.' ? null : state.rhs += button.innerText;
      }
    }
    console.log(state)
    updateDisplay();
  })
});


operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    const operationType = button.id;
    if(state.operator === '' && state.lhs !== null) {
      operationType == '=' ? null : state.operator = operationType;
    } else if (state.operator !== '' && state.rhs !== null) {
      state.result = operate(state.operator, parseFloat(state.lhs), parseFloat(state.rhs));
      
      state.lhs = `${state.result}`;
      state.rhs = null;

      operationType == '=' ? state.operator = '' : state.operator = operationType;
    }
    else if (state.operator !== '' && state.rhs === null) {
      operationType == '=' ? null : state.operator = operationType;
    }

    console.log(state)
    updateDisplay();

  })
});


clearButton.addEventListener('click', () => {
  clear();
  updateDisplay();
})


const updateDisplay = () => {
  display.innerText = `${state.lhs ?? '' } ${state.operator ?? ''} ${state.rhs ?? ''}`;
}