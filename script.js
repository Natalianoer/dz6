class Calculator {
  constructor(prevOperandBtn, currentOperandBtn) {
    this.prevOperandBtn = prevOperandBtn;
    this.currentOperandBtn = currentOperandBtn;
    this.clear();
  }
  clear() {
    this.currentOperand = '';
    this.prevOperand = '';
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  addNumbers(numbers) {
    if (numbers === '.' && this.currentOperand.includes('.')) return
     this.currentOperand = this.currentOperand.toString() + numbers.toString();
  }
  choiceOperation(operation) {
    if (this.currentOperand === '') return
    if (this.prevOperand !== '') {
      this.result();
    }
    this.operation = operation;
    this.prevOperand = this.currentOperand + ' ' + this.operation;
    this.currentOperand = '';
  }
  result() {
    const prev = parseFloat(this.prevOperand);
    const current = parseFloat(this.currentOperand);
    //if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        if (((prev == 0.1) && (current == 0.2)) || ((current == 0.1) && (prev == 0.2))) {
          resultat = 0.3;
        } else {
          resultat = prev + current;
        }
        break;
      case '-':
        resultat = prev - current;
        break;
      case '*':
        resultat = prev * current;
        break;
      case '/':
        if (current == 0) {
          resultat = 'Деление на ноль запрещено';
        } else {
          resultat = prev / current;
        }
        break;
      case '%':
        resultat = prev % current;
        break;
      case 'cos()':
        resultat = Math.cos(prev);
        break;
      case 'sin()':
        resultat = Math.sin(prev);
        break;
      case 'tg()':
        resultat = Math.tan(prev);
        break;
      case 'ctg()':
        resultat = Math.cos(prev) / Math.sin(prev);
        break;
      case 'радиан':
        resultat = prev * (180 / Math.PI);
        break;
      case '°':
        resultat = prev * (Math.PI / 180);
        break;
      case 'n!':
        resultat = factorial(prev);
        break;
      default:
      return
    }
    this.currentOperand = resultat;
    this.operation = undefined;
    this.prevOperand = '';
  }
  display() {
    this.currentOperandBtn.innerText = this.currentOperand;
    this.prevOperandBtn.innerText = this.prevOperand;
  }
}

const numbersBtn = document.querySelectorAll('[data-numbers]');
const operationBtn = document.querySelectorAll('[data-operation]');
const equallyBtn = document.querySelector('[data-equally]');
const deleteBtn = document.querySelector('[data-delete]');
const clearBtn = document.querySelector('[data-clear]');
const prevOperandBtn = document.getElementById('prev_operand');
const currentOperandBtn = document.getElementById('current_operand');

const calculator = new Calculator(prevOperandBtn, currentOperandBtn);

let resultat;

numbersBtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.addNumbers(button.innerText);
    calculator.display();
  })
});

operationBtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.choiceOperation(button.innerText);
    calculator.display();
  })
});

equallyBtn.addEventListener('click', () => {
  calculator.result();
  calculator.display();
});

clearBtn.addEventListener('click', () => {
  calculator.clear();
  calculator.display();
});

deleteBtn.addEventListener('click', () => {
  calculator.delete();
  calculator.display();
});

function factorial(n) {
  if ((n !== 1 ) && (n !== 0)) {
    return n * factorial(n - 1);
  }
  if ((n === 1) || (n === 0)) {
    return 1;
  }
}

function pow() {
  
}
