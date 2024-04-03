const numBtns = document.querySelectorAll('.num-btn')
const oprtBtns = document.querySelectorAll('.oprt-btn')
const expression = document.querySelector('#expression')
const result = document.querySelector('#result')
const toggleBtn = document.querySelector('#toggle')
const delBtn = document.querySelector('.del-btn')
const clrBtn = document.querySelector('.clr-btn')
const evalBtn = document.querySelector('.eval-btn')
const root = document.querySelector(':root');
let stack = [];
let [operand1, operand2, operator] = [null, null, null];
let i = 0; let operand = "";

let inputNumbers = ({target}) => {
    operand += target.dataset.value; // seting operand value
    stack[i] = parseFloat(operand); // pushing the operand to stack
    display(stack)
}
let inputOperators = ({target}) => {   
    operand = "";
    if (target.innerHTML == "+/-") {
        (stack[i] > 0) ? stack[i] = -1* stack[i] : stack[i] = -1 * stack[i];
    }
    else if (target.innerHTML == "-" && stack.length == 0) {
        stack[i] = operand = target.innerHTML;
    }
    else {
        stack[++i] = target.innerHTML; // pushing the operator to stack
        i++; // incrementing stack index after pushing operator
    }
    display(stack)
}
let display = (stack) => {
    expression.innerHTML = stack.join("");
    if(stack.length > 2) {
        let res = calculate(stack);
        isNaN(res) ? result.innerHTML = "" : result.innerHTML = res;
        console.log("If condition")
    }
    // console.log(stack)
    handleDisplaySize();
}
let handleDisplaySize = () => {
    if (expression.innerHTML.length > 14) {
        expression.style.fontSize = "2rem";
    } else if (expression.innerHTML.length > 11  && expression.innerHTML.length < 14) {
        expression.style.fontSize = "3rem";
    } else {
        expression.style.fontSize = "4rem";
    }
}
let handleDelete = () => {
    let lastElement = stack[stack.length-1].toString();
    if(lastElement.length>1) {
        lastElement = lastElement.slice(0,-1);
        stack.pop(); // popping last element
        stack.push(parseFloat(lastElement)); // pushing updated(trimmed) last element
        operand = lastElement; // updating operand value as last element
    } else {
        stack.pop(); // popping last element
        operand = ""; // reseting operand value
    }
    display(stack)
}
let emptyStack = () => {
    stack = []; i = 0; operand = "";
}
let clearDisplay = () => {
    emptyStack(); // clearing the stack
    result.innerHTML = expression.innerHTML = "";
}
let showResult = () => {
    expression.innerHTML = result.innerHTML;
    result.innerHTML = "";
    emptyStack();
    stack[i] = parseFloat(expression.innerHTML);
}
let calculate = (arr) => {
    operand1 = arr[0];
    for(let i=0; i<arr.length; i++) {
        operator = arr[i+1];
        operand2 = arr[i+2];        
        switch(operator) {
            case "+" : operand1 += operand2; break;
            case "-" : operand1 -= operand2; break;
            case "×" : operand1 *= operand2; break;
            case "÷" : operand1 /= operand2; break;
            case "%" : operand1 = (operand1/100) * operand2; break;
        }
    }
    return operand1;      
}
let toggleDarkMode = ({target}) => {
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
}

numBtns.forEach(btn => btn.onclick = inputNumbers)
oprtBtns.forEach(btn => btn.onclick = inputOperators)
delBtn.onclick = handleDelete;
clrBtn.onclick = clearDisplay;
evalBtn.onclick =  showResult;
toggleBtn.onchange = toggleDarkMode;

