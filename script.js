const output = document.getElementById('output');
const history = document.getElementById('history');

let currentInput = '';
let resultDisplayed = false;

function updateDisplay() {
  output.textContent = currentInput || '0';
}

function calculate() {
  try {
    const result = eval(currentInput);
    history.textContent = currentInput + ' =';
    currentInput = result.toString();
    resultDisplayed = true;
    updateDisplay();
  } catch {
    output.textContent = 'Error';
    currentInput = '';
  }
}

function handleInput(value) {
  if (value === 'C') {
    currentInput = '';
    history.textContent = '';
    resultDisplayed = false;
  } else if (value === '⌫') {
    currentInput = currentInput.slice(0, -1);
  } else if (value === '=') {
    calculate();
    return;
  } else {
    if (resultDisplayed && /[\d.]/.test(value)) {
      currentInput = '';
      resultDisplayed = false;
    }
    currentInput += value;
  }
  updateDisplay();
}

// Button clicks
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    handleInput(btn.dataset.value);
  });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  const key = e.key;

  if ('0123456789.+-*/'.includes(key)) {
    handleInput(key);
  } else if (key === 'Enter') {
    handleInput('=');
  } else if (key === 'Backspace') {
    handleInput('⌫');
  } else if (key === 'Escape') {
    handleInput('C');
  }
});
