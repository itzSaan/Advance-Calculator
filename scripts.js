const numBtns = document.querySelectorAll('.num-btn')
const oprtBtns = document.querySelectorAll('.oprt-btn')
const expression = document.querySelector('#expression')
const result = document.querySelector('#result')
const toggleBtn = document.querySelector('#toggle')
const delBtn = document.querySelector('.del-btn')
const clrBtn = document.querySelector('.clr-btn')
const evalBtn = document.querySelector('.eval-btn')
let root = document.querySelector(':root');
let stack = [];
let [operand1, operand2, operator] = [null, null, null];

let val='';
let handleClick = ({target}) => {
    val += target.innerHTML; 
    updateDisplay(val);
}
const regx = /[^.0-9]/g;
let updateDisplay = (val) => {    
    expression.innerHTML = val;
    // console.log(val);      
    const arr = val.split(regx);
    if(regx.test(val)) {            
        operand1 = compute(operand1, operand2, operator);
        stack.push(operand1);
            result.innerHTML = operand1;
        }
        // console.log(arr);      
        arr.length == 1 ? 
                        operand2 = null :
                        operand2 = arr[arr.length - 1];       
        // result.innerHTML = compute(operand1, operand2, operator);
        console.log(operand1, operand2, operator);
        console.log(stack);
};
let handleDelete = () => {        
    let str = expression.innerHTML;
    val = str.slice(0, -1);
    updateDisplay(val);
}
let clearScreen = () => {
    result.innerHTML = "";
    expression.innerHTML = "";
    [operand1, operand2, operator] = [null, null, null]; 
    val = '';   
}
let compute = (operand1, operand2, operator) => { 
    let resultValue = ""; 
    if(operand1!=null &&operand2!=null&&operator!=null) {          
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
    operand1 = resultValue;
    return resultValue;
}
numBtns.forEach(btn => btn.addEventListener('click', ({target}) => {
    handleClick({target});                 
}));
oprtBtns.forEach(btn => btn.addEventListener('click', ({target}) => {
    // result.innerHTML == "" ? operand1 = expression.innerHTML : operand1 = result.innerHTML;
    operand1 = expression.innerHTML;
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
    val = expression.innerHTML;
    updateDisplay(val);
    result.innerHTML = "";
});

toggleBtn.addEventListener('change', ({target}) => {
    if(target.checked) {
        root.style.setProperty('--bg-color', '#f1f2f3');
        root.style.setProperty('--text-color', '#17171c');
        root.style.setProperty('--secondary', '#d2d3da');
        root.style.setProperty('--general', '#fff');
    } else {
        root.style.removeProperty('--bg-color');
        root.style.removeProperty('--text-color');
        root.style.removeProperty('--secondary');
        root.style.removeProperty('--general');
    }
});




