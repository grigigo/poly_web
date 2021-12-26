function pow (x, n) {
    let res = x;
    if (Number.isInteger(x) && Number.isInteger(n) && x > 0 && n > 0)
        for (let i = 1; i < n; i++) res *= x;
    return res;
}

console.log('pow(5, 3) is ' + pow(5, 3));