
let prevNumber = '';
let calculationOperator = '';
let currentNumber = '0';
let TriggerEqual = false;

const numbers = document.querySelectorAll('.number');
const decimal = document.querySelector('.decimal');
const calculatorScreen = document.querySelector('.calculator-screen');
const operators = document.querySelectorAll('.operator');
const percentage = document.querySelector('.percentage');
const equalSign = document.querySelector('.equal-sign');
const clearBtn = document.querySelector('.all-clear');
const audio = document.getElementById('audio');

function playM(){
    const promise = audio.play();

    if(promise !== undefined){
        promise.then(() => {
            // Autoplay started
            audio.muted = false;
            audio.play();
        }).catch(error => {
            // Autoplay was prevented.
            audio.muted = true;
        });
    }
}

const clearAll = () => {
    prevNumber = '';
    calculationOperator = '';
    currentNumber = '0';
    TriggerEqual = false;
}

inputDecimal = (dot) => {
    if (currentNumber.includes('.')){
        return
    }
    currentNumber += dot;
}

inputPercentage = (percen) =>{
    return percen / 100;
}

/** Listener click event button const number */
numbers.forEach( (number)=> {
    number.addEventListener("click", (event) =>{
        playM();
        inputNumber(event.target.value);
        updateScreen(currentNumber);
    });
});

/** Listener click event button const decimal */
decimal.addEventListener('click', (event) => {
    playM();
    inputDecimal(event.target.value);
    updateScreen(currentNumber);
});

/** Listener click event button const percentage */
percentage.addEventListener('click', (event) => {
    playM()
    currentNumber = inputPercentage(currentNumber);
    updateScreen(currentNumber);
})

/** Listener click event button const operator */
operators.forEach( (operator)=> {
    playM();
    operator.addEventListener("click", (event) =>{
        inputOperator(event.target.value);
    });
});

/** Listener click event button const operator */
equalSign.addEventListener('click', () => {
    playM();
    if(calculationOperator === ''){
        return
    }
    else {
        TriggerEqual = true;
        calculate();
        updateScreen(currentNumber);
    }
    
});

/** Listener click event button const clearBtn */
clearBtn.addEventListener('click', function(){
    playM();
    clearAll();
    updateScreen(currentNumber);
});

/** function kalkulasi nilai */
const calculate = () => {
    let result = ''
    switch(calculationOperator){
        case "+":
            result = parseFloat(prevNumber) + parseFloat(currentNumber);
            break;
        case "-":
            result = parseFloat(prevNumber) - parseFloat(currentNumber);
            break;
        case "*":
            result = parseFloat(prevNumber) * parseFloat(currentNumber);
            break;
        case "/":
            result = parseFloat(prevNumber) / parseFloat(currentNumber);
            break;
        default:
            break;
    }
    
    // kondisi TriggerEqual digunakan jika user menekan button sama dengan
    // jika user menekan button operator, maka elsa akan berjalan
    if (TriggerEqual){
        currentNumber = result;
        calculationOperator = '';
        TriggerEqual = false;
    }
    else {
        currentNumber = result;
    }
    
}

/** function updateScreen */
const updateScreen = function(number) {
    calculatorScreen.value = number;
}

/** menerima masukan angka lebih dari 1 digit */
const inputNumber = (number) => {
    if (currentNumber === '0') {
        currentNumber = number;
    } else {
        currentNumber += number;
    }
}

/** menerima input operator */
const inputOperator = (operator) => {
    playM();
    
    if (calculationOperator === ''){
        prevNumber = currentNumber;
        calculationOperator = operator;
        currentNumber = '';
    } 

    else if (currentNumber === ''){
        calculationOperator = operator;
    }   

    else if (calculationOperator && currentNumber !== null){
        calculate();
        updateScreen(currentNumber);

        prevNumber = currentNumber;
        calculationOperator = operator;
        currentNumber = '';
    }

    // console.log(`${prevNumber} ${calculationOperator} ${currentNumber}`);
}
