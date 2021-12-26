function fibb(num) {
    let a = 0, b = 1;
    for (let i = 2; i < num; ++i) {
        c = a + b;
        a = b;
        b = c;
    }
    return c;
}

console.log('fibb(8) is ' + fibb(8));