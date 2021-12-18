'use strict';

let api_key = '50d2199a-42dc-447d-81ed-d68a443b697e';
let url_site = 'http://tasks-api.std-900.ist.mospolytech.ru/api/tasks';
//'name' : elem['name'], 'desc' : elem['desc'], 'id' : elem['id'], 'status' : elem['status']

function downloadData(action = 'GET', task_id = -1, task_form = '', status = '') {
    if (task_id != -1) {
        url_site += '/';
        url_site += task_id;
    }
    let url = new URL(url_site);
    console.log(url_site);
    url.searchParams.append('api_key', api_key);
    let xhr = new XMLHttpRequest();
    xhr.open(action, url);
    xhr.responseType = 'json';

    if (action == 'POST') {
        let body = '&name=' + task_form['name'] + '&desc=' + task_form['desc'] + '&status=' + task_form['status'];
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        xhr.send(body);
    }

    if (action == 'PUT') {
        let body = '&name=' + task_form['name'] + '&desc=' + task_form['desc'] + 
            (status == '' ? ('&status=' + task_form['status']) : ('&status=' + status));
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        xhr.send(body);
    }
    
    if (action == 'DELETE') {
        xhr.send();
    }

    if (action == 'GET') {
        xhr.responseType = 'json';
        xhr.onload = function () {
            renderList(this.response['tasks']);
        }
        xhr.send();
    }
}

function renderList(tasks) {
    for (let elem of tasks) {
        let form = document.querySelector('.action-task-btn').closest('.modal').querySelector('form');
        form.elements['name'].value = elem['name'];
        form.elements['description'].value = elem['desc'];
        form.elements['column'].value = elem['status'];
        form.elements['task-id'].value = elem['id'];
        form.elements['action'].value = 'create';

        let listElement = document.getElementById(`${form.elements['column'].value}-list`);
        listElement.append(createTaskElement(form));

        let tasksCounterElement = listElement.closest('.card').querySelector('.tasks-counter');
        tasksCounterElement.innerHTML = Number(tasksCounterElement.innerHTML) + 1;
    }
    return
}

function showAlert(msg, category = 'success') {
    let text = 'alert-' + category;
    let alertsContainer = document.querySelector('.alerts');
    let newAlertElement = document.getElementById('alerts-template').cloneNode(true);
    newAlertElement.querySelector('.msg').innerHTML = msg;
    newAlertElement.classList.remove('d-none');
    newAlertElement.classList.add(text);
    alertsContainer.append(newAlertElement);
}

function createTaskElement(form) {
    if (form.elements['name'].value != '') {
        let newTaskElement = document.getElementById('task-template').cloneNode(true);
        newTaskElement.id = taskCounter++;
        newTaskElement.querySelector('.task-name').innerHTML = form.elements['name'].value;
        newTaskElement.querySelector('.task-description').innerHTML = form.elements['description'].value;
        newTaskElement.setAttribute('id', form.elements['task-id'].value);
        newTaskElement.classList.remove('d-none');
        for (let btn of newTaskElement.querySelectorAll('.move-btn')) {
            btn.onclick = moveBtnHandler;
        }
        return newTaskElement
    }
    else {
        showAlert('Поле с названием не должно быть пустым!', 'danger');
        return 0;
    }
}

function updateTask(form) {
    let taskElement = document.getElementById(form.elements['task-id'].value);
    
    if (form.elements['name'].value == '') {
        showAlert('Поле с названием не должно быть пустым!', 'danger');
        return 0;
    }
    else {
        taskElement.querySelector('.task-name').innerHTML = form.elements['name'].value;
        taskElement.querySelector('.task-description').innerHTML = form.elements['description'].value;
        let task_form = {
            'name': form.elements['name'].value,
            'desc': form.elements['description'].value,
            'status': form.elements['column'].value,
        }
        downloadData('PUT', form.elements['task-id'].value, task_form, '');
        return 1;
    }
}


function actionTaskBtnHandler(event) {
    let form, listElement, tasksCounterElement, alertMsg, action;
    form = event.target.closest('.modal').querySelector('form');
    action = form.elements['action'].value;

    if (action == 'create') {
        listElement = document.getElementById(`${form.elements['column'].value}-list`);
        
        let element = createTaskElement(form);
        console.log(element);
        if (element) {
            listElement.append(element);
        }
        else {
            return;
        }

        tasksCounterElement = listElement.closest('.card').querySelector('.tasks-counter');
        tasksCounterElement.innerHTML = Number(tasksCounterElement.innerHTML) + 1;

        let task_form = {
            'name': form.elements['name'].value,
            'desc': form.elements['description'].value,
            'status': form.elements['column'].value,
        }
        downloadData('POST', -1, task_form, 0);

        alertMsg = `Задача ${form.elements['name'].value} была успешно создана!`;
    } else if (action == 'edit') {
        if(updateTask(form)) alertMsg = `Задача ${form.elements['name'].value} была успешно обновлена!`;
    }

    if (alertMsg) {
        showAlert(alertMsg);
    }
}

function resetForm(form) {
    form.reset();
    form.querySelector('select').closest('.mb-3').classList.remove('d-none');
    form.elements['name'].classList.remove('form-control-plaintext');
    form.elements['description'].classList.remove('form-control-plaintext');
}

function setFormValues(form, taskId) {
    let taskElement = document.getElementById(taskId);
    form.elements['name'].value = taskElement.querySelector('.task-name').innerHTML;
    form.elements['description'].value = taskElement.querySelector('.task-description').innerHTML;
    form.elements['task-id'].value = taskId;
}

function prepareModalContent(event) {
    let form = event.target.querySelector('form');
    resetForm(form);

    let action = event.relatedTarget.dataset.action || 'create';

    form.elements['action'].value = action;
    event.target.querySelector('.modal-title').innerHTML = titles[action];
    event.target.querySelector('.action-task-btn').innerHTML = actionBtnText[action];

    if (action == 'show' || action == 'edit') {
        setFormValues(form, event.relatedTarget.closest('.task').id);
        event.target.querySelector('select').closest('.mb-3').classList.add('d-none');
    }

    if (action == 'show') {
        form.elements['name'].classList.add('form-control-plaintext');
        form.elements['description'].classList.add('form-control-plaintext');
    }
}

function removeTaskBtnHandler(event) {
    let form = event.target.closest('.modal').querySelector('form');
    let taskElement = document.getElementById(form.elements['task-id'].value);

    console.log(form)
    console.log(form.elements['task-id'].value);
    downloadData('DELETE', form.elements['task-id'].value, 0, 0);

    let tasksCounterElement = taskElement.closest('.card').querySelector('.tasks-counter');
    tasksCounterElement.innerHTML = Number(tasksCounterElement.innerHTML) - 1;

    taskElement.remove();
}

function moveBtnHandler(event) {
    let taskElement = event.target.closest('.task');
    let currentListElement = taskElement.closest('ul');
    let targetListElement = document.getElementById(currentListElement.id == 'to-do-list' ? 'done-list' : 'to-do-list');

    let tasksCounterElement = taskElement.closest('.card').querySelector('.tasks-counter');
    tasksCounterElement.innerHTML = Number(tasksCounterElement.innerHTML) - 1;

    targetListElement.append(taskElement);

    tasksCounterElement = targetListElement.closest('.card').querySelector('.tasks-counter');
    tasksCounterElement.innerHTML = Number(tasksCounterElement.innerHTML) + 1;

    downloadData('PUT', taskElement.id, 0, currentListElement.id != 'done-list' ? 'done' : 'to-do', 0);
}

let taskCounter = 0;

let titles = {
    'create': 'Создание новой задачи',
    'edit': 'Редактирование задачи',
    'show': 'Просмотр задачи'
}

let actionBtnText = {
    'create': 'Создать',
    'edit': 'Сохранить',
    'show': 'Ок'
}

window.onload = function () {
    downloadData();

    document.querySelector('.action-task-btn').onclick = actionTaskBtnHandler;

    document.getElementById('task-modal').addEventListener('show.bs.modal', prepareModalContent);

    document.getElementById('remove-task-modal').addEventListener('show.bs.modal', function (event) {
        let taskElement = event.relatedTarget.closest('.task');
        let form = event.target.querySelector('form');
        form.elements['task-id'].value = taskElement.id;
        event.target.querySelector('.task-name').innerHTML = taskElement.querySelector('.task-name').innerHTML;
    });
    document.querySelector('.remove-task-btn').onclick = removeTaskBtnHandler;

    for (let btn of document.querySelectorAll('.move-btn')) {
        btn.onclick = moveBtnHandler;
    }
}