function getSortedArray(array, key) {
    let flag = true, tmp;
    while (flag) {
        flag = false;
        for (let i = 1; i < array.length; ++i) {
            if (array[i - 1][key] > array[i][key]) {
                flag = true;
                tmp = array[i - 1];
                array[i - 1] = array[i];
                array[i] = tmp;
            }
        }
    }

    for (let elem of array) console.log('name: ' + elem['name'] + ', age: ' + elem['age'])
}

let array = [{ name: 'Макар', age: 20 }, { name: 'Роберт', age: 32 }, { name: 'Екатерина', age: 50 },
            { name: 'Оксана', age: 24 }, { name: 'Святослав', age: 43 }];

getSortedArray(array, 'age');
console.log('');
getSortedArray(array, 'name');