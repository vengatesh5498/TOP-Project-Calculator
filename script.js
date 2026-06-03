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
function subtract (a,b) {return a-b;}
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
    switch (op) {
        case '+': return add(num1, num2);
        case '-': return subtract(num1, num2);
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

function handleInput (type,value){

    //Handling the AC, Backspace and other logical features using the HTML attributes
    if (type==='clear'){
        firstNumber='';
        operator='';
        secondNumber='';
        isCalculationFinished=false;
        calcScreen.textContent=0;
        return
    }
    
    //Applying logic for the backspace button
    if(type==='backspace'){
        //state1: First number exists but operator does not extit as of now 76<- gives 7
        if(operator===''){
            firstNumber=firstNumber.slice(0,-1);
            updateDisplayvalue(firstNumber||'0');
        }
        //state2: First number and operator exists but not second number 70+<- will turn into 7
        else if (operator!==''&& secondNumber==='') {
            operator='';
            updateDisplayvalue(firstNumber);
        }
        //state3: first number, operator, and second number exists 78+85<- will give 78+8
        else{
            secondNumber = secondNumber.slice(0,-1);
            updateDisplayvalue(secondNumber||'0');
        } 
        return;
    }
    // If previous calculation ended and fresh digit is clicked
    if (type==='number'&& isCalculationFinished){
        firstNumber=value;
        isCalculationFinished=false;
        updateDisplayvalue(firstNumber);
        return;
    }
    //This block of code below creates the whole number from the number string declare in HTML
    if (type==='number'){
        // Displays the number instead of placeholder 0
        if (operator === ''){
            if (firstNumber==='0')
                firstNumber='';
            firstNumber += value;
            updateDisplayvalue(firstNumber);
        }else{
            if(secondNumber==='0')
                secondNumber='';
            secondNumber+=value;
            updateDisplayvalue(secondNumber);
        }
    }
    // This block of code below makes sure that the decimal values entered are 2.654 and not 2.54.654.54
    if (type === 'decimal'){
        if (operator ===''){
            if(!firstNumber.includes('.')){
                firstNumber+= (firstNumber==='')? '0.' : '.';
                updateDisplayvalue(firstNumber);
            }
        }else {
            if (!secondNumber.includes('.')){
                secondNumber += (secondNumber === '') ? '0.' : '.';
                updateDisplayvalue(secondNumber);
            }
        }
    }

    // This block of code makes sure that the user does not type 5+/ as addition and division cannot be next to each other for math evaluation
    if(type==='operator'){
        isCalculationFinished = false;
        if (firstNumber!=='' && operator !== '' && secondNumber=== ''){
            operator = value;
            return;
        }
        // This block of code below executes the result first after we get the 3 variables to perform the math operation
        if (firstNumber!=='' && operator !== '' && secondNumber!== ''){
            const output = operate (operator, Number(firstNumber), Number(secondNumber));
            updateDisplayvalue(output);
            firstNumber = output.toString();
            secondNumber= '';
        }
        if (firstNumber==='') firstNumber = '0';
        operator = value;
        isCalculationFinished = false;
    }

    if(type==='equal'){
        if (firstNumber!=='' && operator !== '' && secondNumber!== ''){
            const output = operate (operator, Number(firstNumber), Number(secondNumber));
            updateDisplayvalue(output);
            firstNumber = output.toString();
            operator = '';
            secondNumber= '';
            isCalculationFinished=true;
        }
    }
}
// The below code adds the event listner to check the clicks on the display
allButtons.addEventListener('click',(e) => {
//   The below code makes sure that the clicks on the empty grid space is ignored
    if (!e.target.closest('button'))return;
    const btn = e.target;
    // The below code picks up the data type and the corresponding value in the HTML attribute
    handleInput(btn.dataset.type, btn.value);
});
// The below line of code tracks all the keystrokes in the number pad and the upper row number keys
document.addEventListener('keydown', (e)=>{
    // Declaring an empty string called type to capture the type declared in the HTML
    let type='';
    let value=e.key;

    if(!isNaN(value) && value !== ' ') type ='number';
    // Includes value captures anything inside the array that's been specified
    else if (['+','-','*','/'].includes(value)) type = 'operator';
    else if (value === '.') type = 'decimal';
    else if (value === '='|| value === 'Enter'){type='equal'; value = '=';}
    else if (value === 'Backspace') type = 'backspace';
    else if (value.toLowerCase()==='c'|| value === 'Escape') {type = 'clear';value = 'AC';}

    if (type !== ''){
        e.preventDefault()//prevents normal webpage shortcut behaviours
        handleInput(type,value);
    }
})
