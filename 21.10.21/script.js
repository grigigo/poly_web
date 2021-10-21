"use strict";

// Задача 1

function bubbleSort(array) {
    for (let i = 1; i < array.length; ++i) {
        for (let j = 1; j < array.length; ++j) {
            if (array[j] < array[j - 1]) {
                let tmp = array[j];
                array[j] = array[j - 1];
                array[j - 1] = tmp;
            }
        }
    }
}

let arr = [9, 5, 6, 8, 7, 3, 4, 2, 1];

// arr.sort();
bubbleSort(arr);
arr.forEach(function(item) {
    console.log(item);
});

console.log("");

// Задача 2


/* Рабочий метод, но нравится меньше нижнего
function countNum(array) {
    let count = [];
    let obj = {};

    array.forEach(function(item) {
        if (count[item]) count[item]++;
        else (count[item] = 1);
    });

    count.forEach(function(item, index) {
        if (item > 1) obj[index] = item;
    });

    return obj;
} */

function countNum2(array) {
    let obj = {};

    array.forEach(function(item) {
        if (item in obj) ++obj[item];
        else obj[item] = 1;
    });

    for (let item in obj) if (obj[item] == 1) delete obj[item];

    return obj;
}

let arr2 = [1, 2, 2, 5, 9, 4, 3, 5, 7, 10, 2, 1, 8, 7];

let myObj = countNum2(arr2);
for (let elem in myObj) console.log(elem + ": " + myObj[elem]);
console.log("");

// Задача 3

/* Нерабочая штука
function maxOfMinFun_test(array) { 
    let max = -1;
    array.forEach(function(index, array) { 
        if (Math.min(array[index]) > max) max = Math.min(array[index]);
    });
    return max;
} */

function maxOfMinFun(array) {
    let max = -1;
    for (let i = 0; i < 3; ++i) {
        let min = 100;
        for (let j = 0; j < 3; ++j) {
            if (array[i][j] < min) min = array[i][j];
        }
        if (min > max) max = min;
    }
    return max;
}

let arr3 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log(maxOfMinFun(arr3));
console.log("");

// Задача 4

function vectorSum(vec) {
    let x = vec.x + this.x;
    let y = vec.y + this.y;
    let z = vec.z + this.z;

    return new Vector(x, y, z);
}

function vectorMultElem(vec) {
    let x = vec.x * this.x;
    let y = vec.y * this.y;
    let z = vec.z * this.z;

    return new Vector(x, y, z);
}

function vectorSub(vec) {
    let x = this.x - vec.x;
    let y = this.y - vec.y;
    let z = this.z - vec.z;

    return new Vector(x, y, z);
}

function vectorMultNum(num) {
    let x = this.x * num;
    let y = this.y * num;
    let z = this.z * num;

    return new Vector(x, y, z);
}

function vectorLength() {
    return Math.sqrt(this.x**2 + this.y**2 + this.z**2);
}

function showVector() {
    console.log("(" + this.x + ", " + this.y + ", " + this.z + ")");
}

function Vector(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.vectorSum = vectorSum;
    this.showVector = showVector;
    this.vectorMultElem = vectorMultElem;
    this.vectorSub = vectorSub;
    this.vectorMultNum = vectorMultNum;
    this.vectorLength = vectorLength;
}

let vec1 = new Vector(1, 2, 3);
let vec2 = new Vector(4, 5, 6);

let vecSum = vec1.vectorSum(vec2);
vecSum.showVector();

let vecMultElem = vec1.vectorMultElem(vec2);
vecMultElem.showVector();

let vecSub = vec1.vectorSub(vec2);
vecSub.showVector();

let vecMultNum = vec1.vectorMultNum(3);
vecMultNum.showVector();

console.log(vec1.vectorLength());

console.log("");

// Задача 5

function arrShift(array, shift) {
    let tmp;
    for (let i = 0; i < shift; ++i) {
        tmp = array.pop();
        array.unshift(tmp);
    }
}

// arr = [1, 2, 3, 4, 5, 6, 7, 8, 9] см. выше
let k = 3;
arrShift(arr, k);
for (let elem in arr) console.log(arr[elem]);