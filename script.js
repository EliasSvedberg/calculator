class Calculator {
  constructor(prevOperandTextElement, currOperandTextElement){
    this.prevOperandTextElement = prevOperandTextElement
    this.currOperandTextElement = currOperandTextElement
    this.clearAll()
  }

  clearAll() {
    this.currOperand = ''
    this.prevOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currOperand = this.currOperand.toString().slice(0,-1)
  }

  appNum(number) {
    if (number === '.' && this.currOperand.includes('.')) return
    this.currOperand = this.currOperand.toString() + number.toString()
  }

  pickOperation(operation) {
    if (this.currOperand === '') return
    if (this.prevOperand !== ''){
      this.calculate()
    }
    this.operation = operation
    this.prevOperand = this.currOperand
    this.currOperand = ''
  }

  calculate() {
    let computation
    const prev = parseFloat(this.prevOperand)
    const curr = parseFloat(this.currOperand)
    if (isNaN(prev) || isNaN(curr)) return
    switch (this.operation) {
      case '+':
        computation = prev + curr
        break
      case '-':
        computation = prev - curr
        break
      case '*':
        computation = prev * curr
        break
      case '÷':
        computation = prev / curr
        break
      default:
        return
    }
    this.currOperand = computation
    this.operation = undefined
    this.prevOperand  = ''
  }

  updateDisplay() {
    this.currOperandTextElement.innerText = this.currOperand
    if (this.operation != null) {
      this.prevOperandTextElement.innerText = `${this.prevOperand} ${this.operation}`
    } else {
      this.prevOperandTextElement.innerText = ''
    }
  }
}



const numButtons = document.querySelectorAll('[data-number]')
const operButtons = document.querySelectorAll('[data-operation]')
const eqButton = document.querySelector('[data-equals]')
const delButton = document.querySelector('[data-delete]')
const acButton = document.querySelector('[data-ac]')
const prevOperandTextElement = document.querySelector('[data-prev-operand]')
const currOperandTextElement = document.querySelector('[data-curr-operand]')


const calculator = new Calculator(prevOperandTextElement, currOperandTextElement)

numButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appNum(button.innerText)
    calculator.updateDisplay()
  })
})


operButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.pickOperation(button.innerText)
    calculator.updateDisplay()
  })
})

eqButton.addEventListener('click', button => {
  calculator.calculate()
  calculator.updateDisplay()
} )

acButton.addEventListener('click', button => {
  calculator.clearAll()
  calculator.updateDisplay()
} )


delButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
} )

/*Make calculator draggable*/
$( function() {
  $( ".calculator-grid" ).draggable();
} );
