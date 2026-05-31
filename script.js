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

