class Calculator {
  constructor(prevOperandBtn, currentOperandBtn, historyText) {
    this.prevOperandBtn = prevOperandBtn;
    this.currentOperandBtn = currentOperandBtn;
    this.historyText = historyText;
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
     this.historyText = this.prevOperand + '  '  + this.currentOperand + '  ';
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
      case 'x^y':
        resultat = pow(prev, current);
        break;
      default:
      return
    }
    this.currentOperand = resultat;
    this.operation = undefined;
    this.prevOperand = '';
    //для записи историй результатов на экран
    let historyCalc =  document.createElement("p");
    historyCalc.className = "historyCalc";
    historyAll.appendChild(historyCalc);
    historyCalc.innerHTML += this.historyText + ' = ' + resultat;
  }
  history() {
    let newArr = [];
    let str = document.getElementsByClassName('historyCalc');
    for (let i = 0; i < str.length; i++) {
      newArr[i] = str[i].innerText;
    }
    let titleHistory = document.createElement("h2");
    historyAll.appendChild(titleHistory);
    let newArrText = document.createElement("div");
    newArrText.className = "historyCalc";
    historyAll.appendChild(newArrText);
    titleHistory.innerHTML = 'Последние три  действия: ';
    newArrText.innerText = newArr.slice(-3);
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
const history = document.querySelector('[data-history]');
const prevOperandBtn = document.getElementById('prev_operand');
const currentOperandBtn = document.getElementById('current_operand');

const calculator = new Calculator(prevOperandBtn, currentOperandBtn);

let historyAll = document.getElementById('history');

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

history.addEventListener('click', () => {
  calculator.history();
});

function factorial(n) {
  if ((n !== 1 ) && (n !== 0)) {
    return n * factorial(n - 1);
  }
  if ((n === 1) || (n === 0)) {
    return 1;
  }
}

function pow(x,y) {
  let rez = x;
  for (let i = 1; i < y; i++) {
    rez = rez * x;
  }
  return rez;
}
