function gcd(a, b) {
    let x = -1;
    let temp;
    if (a > 0 && b > 0) {
        do {
            x = a / b;
            temp = a % b;
            a = b;
            b = temp;
        } while (temp != 0);
    }
    return a;
}

console.log('gcd(40, 56) is ' + gcd(40, 56));