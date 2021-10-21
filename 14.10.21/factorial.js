"use strict";

function factorialIter(x) {
    let s = 1;
    for (let i = 1; i <= x; ++i) s = s * i;
    return s;
}

/* function factorialRec(x) {
    //if (x > 1) x = x * factorialRec(--x);
    //return x;
    
   return x > 0 ? x * factorialRec(--x) : 1;
} */

let fact = (x) => x > 0 ? x * factorialRec(--x) : 1;

let funcXor = (p, q) => p == q ? 0 : 1;

/* function xor(p, q) {
    if (p == q) return 0;
    else return 1;
} */

function isPalindrom(stroka) {
    for (let i = 0; i < Math.trunc(stroka.length / 2); ++i)
        if (stroka[i] != stroka[stroka.length - i - 1]) return false;
    return true;
}

function isPal(str) {
    for (let i = Math.trunc(str.length / 2); i > 0; --i)
        if (str[i] != str[str.length - i - 1]) return false;
    return true;
}

let test = 'шалаш';

console.log(factorialIter(5));
console.log(funcXor(1, 0));
console.log(isPalindrom(test));
console.log(isPal(test));