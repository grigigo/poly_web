function pluralizeRecords(count) {
    let answer = '' + count;
    count %= 10;

    count == 1 ? answer += ' запись' : (count > 1 && count < 5 ? answer += ' записи' : answer += ' записей');

    return answer;
}

console.log('В результате выполнения запроса было найдено ' + pluralizeRecords(120));

/*let count = 120;
console.log('В результате выполнения запроса было найдено ' + count 
    + (count%10 == 1 ? ' запись' : (count%10 > 1 && count%10 < 5 ? ' записи' : ' записей')));*/