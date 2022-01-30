let mode = document.getElementById('IconMode');
let inputNewTodo = document.getElementById('newTodo');

let spanAll = document.getElementById('spanAll');
let spanActive = document.getElementById('spanActive');
let spanCompleted = document.getElementById('spanCompleted');
let clearComplete = document.getElementById('clearComplete');
let visible = 0;

mode.addEventListener('click', ChangeMode);
function ChangeMode(){
    alert('Modo Mudado com Sucesso!');
    let pTodo = document.querySelectorAll('p.TodoItem');
    console.log(pTodo);
}

inputNewTodo.addEventListener('keypress', function(e){
    //Verifica se foi a tecla Enter que acionou o evento keypress
    //se não for a função é encerrada
    //verifica também se o Input está vazio, e se estiver a função também é encerrada
    const keycode = e.keyCode;
    if(keycode != 13 || inputNewTodo.value == ''){
        return;
    }
    //se foi a tecla enter o resto da função é executado
    let DivTodo = document.createElement('div');
    let DivCircle = document.createElement('div');
    let pTodo = document.createElement('p');
    const DivContainerTodos = document.getElementById('containerTodo');

    DivTodo.setAttribute('class', 'DivTodoItem active');
    DivCircle.setAttribute('class', 'circle TodoItem active');
    DivCircle.addEventListener('click', markTodo);
    pTodo.setAttribute('class', 'TodoItem');
    pTodo.addEventListener('click', markTodo);
    pTodo.innerHTML = inputNewTodo.value;

    let pTodoDocument = document.querySelectorAll('p.TodoItem');
    for(let i = 0; i < document.querySelectorAll('p.TodoItem').length; i++){
        if(pTodo.innerHTML == pTodoDocument[i].innerHTML){
            inputNewTodo.value = 'This Todo exists!';
            return;
        }
    }

    DivTodo.appendChild(DivCircle);
    DivTodo.appendChild(pTodo);
    DivContainerTodos.appendChild(DivTodo);

    inputNewTodo.value = '';
    countActivesTodo ();

    switch(visible){
        case 0: allVisible ();
            break;
        case 1: activeVisible ();
            break;
        case 2: completedVisible ();
            break;
    }
});

function markTodo() {
    let children = this.parentNode.children;
    this.parentNode.setAttribute('class', 'DivTodoItem completed');
    for(let i = 0; i < children.length; i++){
        children[i].removeEventListener('click',markTodo);
        children[i].addEventListener('click', markOffTodo);
    }
    countActivesTodo ();

    switch(visible){
        case 1: activeVisible ();
            break;
        case 2: completedVisible ();
            break;
    }
    /*this.setAttribute('class', 'circle TodoItem completed');
    this.removeEventListener('click',markTodo);
    this.addEventListener('click', markOffTodo);*/
}

function markOffTodo () {
    let children = this.parentNode.children;
    this.parentNode.setAttribute('class', 'DivTodoItem active');
    for(let i = 0; i < children.length; i++){
        children[i].removeEventListener('click',markOffTodo);
        children[i].addEventListener('click', markTodo);
    }
    countActivesTodo ();

    switch(visible){
        case 1: activeVisible ();
            break;
        case 2: completedVisible ();
            break;
    }
    /*
    this.setAttribute('class', 'circle TodoItem active');
    this.removeEventListener('click',markOffTodo);
    this.addEventListener('click', markTodo);
    */
}

function countActivesTodo (){
    let ActivesTodo = document.querySelectorAll('div.DivTodoItem.active');
    let numberItensLeft = document.getElementById('numberItensLeft');
    numberItensLeft.innerHTML = ActivesTodo.length;
}


spanAll.addEventListener('click', allVisible);
function allVisible () {
    visible = 0;
    spanAll.setAttribute('class', 'spanActiveVisible');
    spanActive.removeAttribute('class');
    spanCompleted.removeAttribute('class');

    let onlyActiveTodoVisible = document.querySelectorAll('div.DivTodoItem.completed');
    for(let i = 0; i < onlyActiveTodoVisible.length; i++){
        onlyActiveTodoVisible[i].setAttribute('class', 'DivTodoItem completed');
    }

    let onlyCompletedTodoVisible = document.querySelectorAll('div.DivTodoItem.active');
    for(let i = 0; i < onlyCompletedTodoVisible.length; i++){
        onlyCompletedTodoVisible[i].setAttribute('class', 'DivTodoItem active');
    }
}

spanActive.addEventListener('click', activeVisible);
function activeVisible () {
    visible = 1;
    spanAll.removeAttribute('class');
    spanActive.setAttribute('class', 'spanActiveVisible');
    spanCompleted.removeAttribute('class');

    let onlyActiveTodoVisible = document.querySelectorAll('div.DivTodoItem.completed');
    for(let i = 0; i < onlyActiveTodoVisible.length; i++){
        onlyActiveTodoVisible[i].setAttribute('class', 'DivTodoItem completed notVisible');
    }

    let onlyCompletedTodoVisible = document.querySelectorAll('div.DivTodoItem.active');
    for(let i = 0; i < onlyCompletedTodoVisible.length; i++){
        onlyCompletedTodoVisible[i].setAttribute('class', 'DivTodoItem active');
    }
}

spanCompleted.addEventListener('click', completedVisible);
function completedVisible () {
    visible = 2;
    spanAll.removeAttribute('class');
    spanActive.removeAttribute('class');
    spanCompleted.setAttribute('class', 'spanActiveVisible');

    let onlyActiveTodoVisible = document.querySelectorAll('div.DivTodoItem.completed');
    for(let i = 0; i < onlyActiveTodoVisible.length; i++){
        onlyActiveTodoVisible[i].setAttribute('class', 'DivTodoItem completed');
    }

    let onlyCompletedTodoVisible = document.querySelectorAll('div.DivTodoItem.active');
    for(let i = 0; i < onlyCompletedTodoVisible.length; i++){
        onlyCompletedTodoVisible[i].setAttribute('class', 'DivTodoItem active notVisible');
    }
}


clearComplete.addEventListener('click', ClearCompleteTodo);
function ClearCompleteTodo () {
    let ActiveTodo = document.querySelectorAll('div.DivTodoItem.completed');
    const DivContainerTodos = document.getElementById('containerTodo');

    for(let i = 0; i < ActiveTodo.length; i++){
        DivContainerTodos.removeChild(ActiveTodo[i]);
    }
}