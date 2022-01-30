let mode = document.getElementById('IconMode');
let inputNewTodo = document.getElementById('newTodo');

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
});

function markTodo() {
    let children = this.parentNode.children;
    this.parentNode.setAttribute('class', 'DivTodoItem completed');
    for(let i = 0; i < children.length; i++){
        children[i].removeEventListener('click',markTodo);
        children[i].addEventListener('click', markOffTodo);
    }
    countActivesTodo ();
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