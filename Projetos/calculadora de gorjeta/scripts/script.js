let conta = 0;
let peoples = 0;
let porcentagem = 0;

let custom = window.document.getElementById('porcentagemCustom');

let btn5 = window.document.getElementById('btn5');
let btn10 = window.document.getElementById('btn10');
let btn15 = window.document.getElementById('btn15');
let btn25 = window.document.getElementById('btn25');
let btn50 = window.document.getElementById('btn50')
btn5.addEventListener('click', button5);
btn10.addEventListener('click', button10);
btn15.addEventListener('click', button15);
btn25.addEventListener('click', button25);
btn50.addEventListener('click', button50);
function button5(){
    porcentagem = 5;
    btn5.setAttribute('class', 'buttonSelect');
    btn10.removeAttribute('class');
    btn15.removeAttribute('class');
    btn25.removeAttribute('class');
    btn50.removeAttribute('class');
    custom.value = '';
    peoplesConta();
}
function button10(){
    porcentagem = 10;
    btn5.removeAttribute('class');
    btn10.setAttribute('class', 'buttonSelect');
    btn15.removeAttribute('class');
    btn25.removeAttribute('class');
    btn50.removeAttribute('class');
    custom.value = '';
    peoplesConta();
}
function button15(){
    porcentagem = 15;
    btn5.removeAttribute('class');
    btn10.removeAttribute('class');
    btn15.setAttribute('class', 'buttonSelect');
    btn25.removeAttribute('class');
    btn50.removeAttribute('class');
    custom.value = '';
    peoplesConta();
}
function button25(){
    porcentagem = 25;
    btn5.removeAttribute('class');
    btn10.removeAttribute('class');
    btn15.removeAttribute('class');
    btn25.setAttribute('class', 'buttonSelect');
    btn50.removeAttribute('class');
    custom.value = '';
    peoplesConta();
}
function button50(){
    porcentagem = 50;
    btn5.removeAttribute('class');
    btn10.removeAttribute('class');
    btn15.removeAttribute('class');
    btn25.removeAttribute('class');
    btn50.setAttribute('class', 'buttonSelect');
    custom.value = '';
    peoplesConta();
}

window.document.getElementById('conta').addEventListener('input', peoplesConta);
window.document.getElementById('peoples').addEventListener('input', peoplesConta);
window.document.getElementById('porcentagemCustom').addEventListener('input', peoplesConta);
function peoplesConta(){
    let txtnumberOfPeoples = window.document.getElementById('peoples');
    let numberOfPeoples = Number(txtnumberOfPeoples.value);
    peoples = Number(numberOfPeoples);

    let txtconta = window.document.getElementById('conta');
    let numberconta = Number(txtconta.value);
    conta = Number(numberconta);

    if(peoples >100){
        txtnumberOfPeoples.value = 100;
        peoples = 100;
    }else if(peoples < 0){
        txtnumberOfPeoples.value = 1;
        peoples = 1;
    }
    if(txtnumberOfPeoples.value == ''){
        peoples = 1;
    }
    
    if(conta > 10000){
        txtconta.value = 10000;
        conta = 10000;
    }else if(conta < 0){
        txtconta.value = 0;
        conta = 0;
    }

    if(custom.value.length != 0){
        porcentagem = Number(window.document.getElementById('porcentagemCustom').value);
        custom.setAttribute('class', 'ativada');
        if(porcentagem > 100){
            porcentagem = 100;
            custom.value = 100;
        }if(porcentagem < 0){
            porcentagem = 0;
            custom.value = 0;
        }
        btn5.removeAttribute('class');
        btn10.removeAttribute('class');
        btn15.removeAttribute('class');
        btn25.removeAttribute('class');
        btn50.removeAttribute('class');
    }else{custom.removeAttribute('class')}

    let pAviso = document.getElementById('aviso');
    if(peoples == 0 && txtnumberOfPeoples.value.length !=0){
        pAviso.innerHTML = "Can't be zero";
        txtnumberOfPeoples.setAttribute('class', 'setZeroPeople');
        return;
    }else{
        pAviso.innerHTML = "";
        txtnumberOfPeoples.removeAttribute('class');
    }

    if(porcentagem != 0 && conta != 0){
        window.document.getElementById('btnResete').style.backgroundColor = 'var(--color1)';
    }else{
        window.document.getElementById('btnResete').style.backgroundColor = 'var(--color25)';
    }

    let gorjeta = conta *(porcentagem/100);
    let gorjetaporPessoa = gorjeta/peoples;
    let total = (conta + gorjeta)/peoples;

    window.document.getElementsByClassName('resulAmont')[0].innerHTML = `$${gorjetaporPessoa.toFixed(2)}`;
    window.document.getElementsByClassName('resulTotal')[0].innerHTML = `$${total.toFixed(2)}`;
}



let btnReset= window.document.getElementById('btnResete');
btnReset.addEventListener('click', reset);
function reset(){
    window.document.getElementById('conta').value = '';
    window.document.getElementById('peoples').value = '';

     conta = 0;
     peoples = 0;
     porcentagem = 0;
     btn5.removeAttribute('class');
     btn10.removeAttribute('class');
     btn15.removeAttribute('class');
     btn25.removeAttribute('class');
     btn50.removeAttribute('class');
     custom.value = '';
     custom.removeAttribute('class');
     document.getElementById('aviso').innerHTML = "";
     window.document.getElementById('peoples').removeAttribute('class');

     let gorjetaporPessoa = 0;
     let total = 0;

    window.document.getElementsByClassName('resulAmont')[0].innerHTML = `$${gorjetaporPessoa.toFixed(2)}`;
    window.document.getElementsByClassName('resulTotal')[0].innerHTML = `$${total.toFixed(2)}`;
    window.document.getElementById('btnResete').style.backgroundColor = 'var(--color25)';

    btnReset.setAttribute('class', 'resetPress');
}