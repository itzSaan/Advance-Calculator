const numBtns = document.querySelectorAll('.num-btn')
const oprtBtns = document.querySelectorAll('.oprt-btn')
const expression = document.querySelector('#expression')
const result = document.querySelector('#result')
const delBtn = document.querySelector('.del-btn')
const clrBtn = document.querySelector('.clr-btn')
const evalBtn = document.querySelector('.eval-btn')

let [operand1, operand2, operator] = [null, null, null];

let val='';
let handleClick = ({target}) => { 
    val += target.innerHTML; 
    updateDisplay(val);
}
let updateDisplay = (val) => {    
        expression.innerHTML = val;
        const arr = expression.innerText.split(regx);
        console.log(arr);
        operand2 = arr[arr.length - 1];        
        compute(operand1, operand2, operator);
        console.log(operand1, operand2, operator);
};
let handleDelete = () => {        
    let str = expression.innerHTML;
    let newStr = str.slice(0, -1);       
    
    updateDisplay(newStr);
}
let clearScreen = () => {
    result.innerHTML = "";
    expression.innerHTML = "";
    [operand1, operand2, operator] = [null, null, null];    
}
let compute = (operand1, operand2, operator) => { 
    let resultValue = ""; 
    if(operand1!=""&&operand2!=""&&operator!="") {          
    switch (operator) {
        case "×":
            resultValue = parseFloat(operand1) * parseFloat(operand2);
            break;
        case "÷":
            resultValue = (parseFloat(operand1) / parseFloat(operand2)).toPrecision(4);
            break; 
        case "+":
            resultValue = parseFloat(operand1) + parseFloat(operand2);
            break;
        case "-":
            resultValue = parseFloat(operand1) - parseFloat(operand2);
            break; 
        case "%":
            resultValue = ((parseFloat(operand1) / 100) * parseFloat(operand2)).toPrecision(3);
            break;     
        }
    }
    result.innerHTML = resultValue;
}

const regx = /[^.0-9]/g;
numBtns.forEach(btn => btn.addEventListener('click', ({target}) => {
    handleClick({target});                 
}));
oprtBtns.forEach(btn => btn.addEventListener('click', ({target}) => {
    result.innerHTML != "" ? operand1 = result.innerHTML : operand1 = expression.innerHTML;
    handleClick({target}); 
    let text = expression.innerHTML;
    if(regx.test(text)) {
        opArr = text.match(regx)
        operator = opArr[opArr.length - 1];
        console.log(opArr)
    }         
}));
delBtn.addEventListener('click', handleDelete);
clrBtn.addEventListener('click', clearScreen);
evalBtn.addEventListener('click', () => {
    expression.innerHTML = result.innerHTML;
    result.innerHTML = "";
});
