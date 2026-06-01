// Declaring empty variables to capture and store the data for the 2 operands and operator
let firstNumber = '';
let operator = '';
let secondNumber = '';
let isCalculationFinished = false;//To determine if there is a result on the display of the calculator

// Adding in a queryselector for all buttons and the calculator screen
const calcScreen = document.querySelector('#calc-screen'); /*selecting the display screen id declared in the HTML*/
const allButtons = document.querySelector('.all-buttons'); /*selectiing the all-buttons class declared in the HTML*/

// Function to perform mathematical logic

function add (a,b) {return a+b;}
function subract (a,b) {return a-b;}
function multiply (a,b) {return a*b;}
// Logic implimentation to make sure that no number is divisible by 0
function divide (a,b){
    if (b===0) {
        return "Error: Division by zero not possible";
    }
    return a/b;
} 

// Function that pricks the keyboard string symbols + - / * and performs the mathematical function
function operate (op, num1, num2){
    switch op {
        case '+': return add(num1, num2);
        case '-': return subract(num1, num2);
        case '*': return multiply(num1, num2);
        case '/': return divide(num1, num2);
        default: return num2;
    }
}

// Function for clearing the complex numbers like 4.546687465 and rounding them 
//Without this function, if you typed 0.1 + 0.2 into your calculator, the screen would display 0.30000000000000004
function updateDisplayvalue (value){
    if (isNaN(value)){
        calcScreen.textContent=value;
        return; //if the value is not a number returns the error message declared in the divide function
    }
    if(!Number.isInteger(Number(value))){
        calcScreen.textContent=Number(value).toFixed(4).replace(/\.?0+$/,"");
        //the above line of code rounds the numbers after decimal to 4 and removes extra 0's and gives only clean round number like 4, 8.5 rather than 4.000 and 8.500
    } else{
        calcScreen.textContent = value;
    }

}