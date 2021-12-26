function minDigit(num) {
    if (Number.isInteger(num) && num > 0) {
        let min = 10;
        while (num) {
            if (min > num % 10) min = num % 10;
            num = ~~(num/10);
        }
        return min;
    }
}

console.log('minDigit(57293) is ' + minDigit(57293));