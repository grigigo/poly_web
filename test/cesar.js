function mod(num) {
    num < 0 ? num += 33 : num %= 33;
    num == 33 ? num -= 33 : num;
    return num;
}

function cesar(str, shift, action) {
    let alpha = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н',
        'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'];

    let sort = [];
    for (let i = 0; i < str.length; ++i) {
        sort[i] = str[i];
        for (let j = 0; j < alpha.length; ++j)
            if (str[i] == alpha[j]) sort[i] = alpha[action == 'encode' ? mod(j + shift) : mod(j - shift)];
    }

    let res = '';
    for (let elem of sort) res += elem;
    console.log(res);
}

console.log('');
let str = 'матрица сломалась';
cesar(str, 19, 'encode'); //ятегыит дюбятютдо

str = "ятегыит дюбятютдо";
cesar(str, 19, 'decode'); //матрица сломалась

//Ответ на задание
str = "эзтыхз фзъзъз";
cesar(str, 8, 'decode'); //хакуна матата