'use strict';

// let apiUrl = 'http://cat-facts-api.std-900.ist.mospolytech.ru/facts';

function createUpvotesElement(num) {
    let upvotesElement = document.createElement('div');
    upvotesElement.classList.add('upvotes');
    upvotesElement.innerHTML = num;
    return upvotesElement;
}

function createAuthorElement(user) {
    user = user || { name: { first: '', last: '' } };
    let authorElement = document.createElement('div');
    authorElement.classList.add('author-name');
    authorElement.innerHTML = user.name.first + ' ' + user.name.last;
    return authorElement;
}

function createFooterElement(record) {
    let footerElement = document.createElement('footer');
    footerElement.classList.add('item-footer');
    footerElement.append(createAuthorElement(record.user));
    footerElement.append(createUpvotesElement(record.upvotes));
    return footerElement;
}


function createContentElement(record) {
    let contentElement = document.createElement('div');
    contentElement.classList.add('item-content');
    contentElement.innerHTML = record.text;
    return contentElement;
}

function createListItemElement(record) {
    let itemElement = document.createElement('div');
    itemElement.classList.add('facts-list-item');
    itemElement.append(createContentElement(record));
    itemElement.append(createFooterElement(record));
    return itemElement;
}

function renderRecords(records) {
    let factsList = document.querySelector('.facts-list');
    factsList.innerHTML = '';
    for (let record of records) {
        factsList.append(createListItemElement(record));
    }
}

function setPaginationInfo(info) {
    document.querySelector('.total-count').innerHTML = info.total_count;
    let start = info.total_count > 0 ? (info.current_page - 1) * info.per_page + 1 : 0;
    document.querySelector('.current-interval-start').innerHTML = start;
    let end = Math.min(info.total_count, start + info.per_page - 1);
    document.querySelector('.current-interval-end').innerHTML = end;
}

function createPageBtn(page, classes = []) {
    let btn = document.createElement('button');
    classes.push('btn');
    btn.classList.add(...classes);
    btn.dataset.page = page;
    btn.innerHTML = page;
    return btn;
}

function renderPaginationElement(info) {
    let btn;
    let paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';

    if (info.total_pages == 0)
        return;

    btn = createPageBtn(1, ['first-page-btn']);
    btn.innerHTML = 'Первая страница';
    paginationContainer.append(btn);

    let buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('pages-btns');
    paginationContainer.append(buttonsContainer);

    let start = info.current_page > 2 ? info.current_page - 2 : 1;
    let end = Math.min(info.current_page + 2, info.total_pages);

    for (let i = start; i <= end; i++) {
        buttonsContainer.append(createPageBtn(i, i == info.current_page ? ['active'] : []));
    }
    btn = createPageBtn(info.total_pages, ['last-page-btn']);
    btn.innerHTML = 'Последняя страница';
    paginationContainer.append(btn);

}

function pageBtnHandler(event) {
    if (event.target.dataset.page) {
        let datainput = document.querySelector("#search-field");
        downloadData(event.target.dataset.page, datainput.value);
    }
}

function pageBtnSearch(event) {
    let datainput = document.querySelector("#search-field");
    downloadData(event.target.dataset.page, datainput.value);
}

function downloadData(page = 1, search = '') {
    let factsList = document.querySelector('.facts-list');
    let perPage = document.querySelector('.per-page-btn').value;
    let url = new URL(factsList.dataset.url);
    url.searchParams.append('per-page', perPage);
    url.searchParams.append('page', page);
    url.searchParams.append('q', search);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        renderRecords(this.response.records);
        setPaginationInfo(this.response['_pagination']);
        renderPaginationElement(this.response['_pagination']);
    }
    xhr.send();
}

function pageBtnList(event) {
    console.log(event.target.innerHTML);
    document.querySelector("#search-field").value = event.target.innerHTML;
    let datainput = document.querySelector("#search-field");
    downloadData(event.target.dataset.page, datainput.value);
    document.querySelector('.search-list-ul').innerHTML = '';
}

window.onload = function () {
    downloadData();
    document.querySelector('.per-page-btn').onchange = function () {
        downloadData();
    }

    document.querySelector('.pagination').onclick = pageBtnHandler;
    document.querySelector('.search-btn').onclick = pageBtnSearch;
    document.querySelector('#search-field').onkeyup = inputData;
    document.querySelector('.search-list-ul').onclick = pageBtnList;
}

function createAutoSearchElem(element) {
    let itemElement = document.createElement('li');
    itemElement.classList.add('auto-list-item');
    itemElement.innerHTML = element;
    return itemElement;
}

function renderList(array) {
    let autoSearch = document.querySelector('.search-list-ul');
    autoSearch.innerHTML = '';
    console.log(array);

    for (let elem of array) {
        if (elem != document.querySelector('#search-field').value) autoSearch.append(createAutoSearchElem(elem));
    }
}

function inputData() {
    let autoList = document.querySelector('.search-list');
    let datainput = document.querySelector('#search-field');
    let url = new URL(autoList.dataset.url);
    url.searchParams.append('q', datainput.value);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        renderList(this.response);
    }
    xhr.send();
}