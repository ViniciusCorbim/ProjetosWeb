let mode = document.getElementById('IconMode');
let inputNewTodo = document.getElementById('newTodo');

let spanAll = document.getElementById('spanAll');
let spanActive = document.getElementById('spanActive');
let spanCompleted = document.getElementById('spanCompleted');
let clearComplete = document.getElementById('clearComplete');
let visible = 0;
let modeVar = false;  // true - Modo Escuro   e   false - Modo Claro

function loadBody () {
    ChangeMode();
    allVisible ();
}

mode.addEventListener('click', ChangeMode);
function ChangeMode(){
    modeVar = !modeVar;
    const body = document.getElementsByTagName('body')[0];
    const container = document.getElementById('container');
    const divCreateTodo = document.getElementsByClassName('createTodo')[0];
    let ActivesTodo = document.querySelectorAll('div.DivTodoItem.active');

    if(modeVar){
        DarkMode ()
    }else{
        LightMode ();
    }
}

function DarkMode () {
    const body = document.getElementsByTagName('body')[0];
    const container = document.getElementById('container');
    const divCreateTodo = document.getElementsByClassName('createTodo')[0];
    let ActivesTodo = document.querySelectorAll('div.DivTodoItem.active');
    let CompletedTodo = document.querySelectorAll('div.DivTodoItem.completed');
    let Menu = document.getElementsByClassName('menu')[0];
    let t3fs = document.getElementsByClassName('t3fs')[0];
    let attribution = document.getElementsByClassName('attribution')[0];

    body.classList.remove('lightMode');
    container.classList.remove('lightMode');
    divCreateTodo.classList.remove('lightMode');
    inputNewTodo.classList.remove('lightMode');
    Menu.classList.remove('lightMode');
    t3fs.classList.remove('lightMode');
    clearComplete.classList.remove('lightMode');
    attribution.classList.remove('lightMode');

    mode.src = 'images/icon-sun.svg';
    body.classList.add('darkMode');
    container.classList.add('darkMode');
    divCreateTodo.classList.add('darkMode');
    inputNewTodo.classList.add('darkMode');
    t3fs.classList.add('darkMode');
    clearComplete.classList.add('darkMode');
    
    for(let i=0; i < ActivesTodo.length; i++){
        ActivesTodo[i].classList.add("darkMode");
        ActivesTodo[i].classList.remove("lightMode");
    }
    for(let i=0; i < CompletedTodo.length; i++){
        CompletedTodo[i].classList.add("darkMode");
        CompletedTodo[i].classList.remove("lightMode")
    }
}
function LightMode () {
    const body = document.getElementsByTagName('body')[0];
    const container = document.getElementById('container');
    const divCreateTodo = document.getElementsByClassName('createTodo')[0];
    let ActivesTodo = document.querySelectorAll('div.DivTodoItem.active');
    let CompletedTodo = document.querySelectorAll('div.DivTodoItem.completed');
    let Menu = document.getElementsByClassName('menu')[0];
    let t3fs = document.getElementsByClassName('t3fs')[0];
    let attribution = document.getElementsByClassName('attribution')[0];

    body.classList.remove('darkMode');
    container.classList.remove('darkMode');
    divCreateTodo.classList.remove('darkMode');
    inputNewTodo.classList.remove('darkMode');
    t3fs.classList.remove('darkMode');
    clearComplete.classList.remove('darkMode');

    mode.src = 'images/icon-moon.svg';
    body.classList.add('lightMode');
    container.classList.add('lightMode');
    divCreateTodo.classList.add('lightMode');
    inputNewTodo.classList.add('lightMode');
    Menu.classList.add('lightMode');
    t3fs.classList.add('lightMode');
    clearComplete.classList.add('lightMode');
    attribution.classList.add('lightMode');

    for(let i=0; i < ActivesTodo.length; i++){
        ActivesTodo[i].classList.add("lightMode");
        ActivesTodo[i].classList.remove("darkMode");
        /*ActivesTodo[i].setAttribute('class', 'DivTodoItem active lightMode');*/
    }
    for(let i=0; i < CompletedTodo.length; i++){
        CompletedTodo[i].classList.add("lightMode");
        CompletedTodo[i].classList.remove("darkMode");
        /*CompletedTodo[i].setAttribute('class', 'DivTodoItem completed lightMode');*/
    }

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
    let imgIconCross = document.createElement('img');
    const DivContainerTodos = document.getElementById('containerTodo');

    imgIconCross.src = 'images/icon-cross.svg';
    imgIconCross.setAttribute('alt', 'icon-cross');
    imgIconCross.setAttribute('class', 'iconCross');

    DivTodo.setAttribute('class', 'DivTodoItem active');
    DivTodo.addEventListener('mouseover', IconCrossVisible);
    DivTodo.addEventListener('mouseout', IconCrossNotVisible);
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
    DivTodo.appendChild(imgIconCross);
    DivContainerTodos.appendChild(DivTodo);

    inputNewTodo.value = '';
    countActivesTodo ();

    if(modeVar){
        DarkMode ()
    }else{
        LightMode ();
    }

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
        children[i].addEventListener('click',markOffTodo);
    }
    countActivesTodo ();

    if(modeVar){
        DarkMode ()
    }else{
        LightMode ();
    }

    switch(visible){
        case 0: allVisible ();
            break;
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

    if(modeVar){
        DarkMode ()
    }else{
        LightMode ();
    }

    switch(visible){
        case 0: allVisible ();
            break;
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

    if(modeVar){
        DarkMode ()
    }else{
        LightMode ();
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

    if(modeVar){
        DarkMode ()
    }else{
        LightMode ();
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

    if(modeVar){
        DarkMode ()
    }else{
        LightMode ();
    }
}

    function IconCrossVisible () {
        let children = this.children;
        for(let i=0; i < children.length; i++){
            if(children[i].classList == 'iconCross'){
                children[i].classList.add('Visible')
            }
        }
    }
    function IconCrossNotVisible () {
        let Visible = document.querySelector('img.iconCross.Visible');
        Visible.classList.remove('Visible');
    }

clearComplete.addEventListener('click', ClearCompleteTodo);
function ClearCompleteTodo () {
    let ActiveTodo = document.querySelectorAll('div.DivTodoItem.completed');
    const DivContainerTodos = document.getElementById('containerTodo');

    for(let i = 0; i < ActiveTodo.length; i++){
        DivContainerTodos.removeChild(ActiveTodo[i]);
    }
}