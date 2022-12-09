"use strict";
function add(n1, n2, showRes, resultPhrase) {
    const result = n1 + n2;
    if (showRes) {
        console.log(resultPhrase + result);
    }
    else {
        return result;
    }
}
let number1 = 4;
const number2 = 2.8;
let printRes = true;
const resultPhrase = 'Result is: ';
add(number1, number2, printRes, resultPhrase);
