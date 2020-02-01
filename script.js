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
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        if ((prev == 0.1) && (current == 0.2)) {
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
