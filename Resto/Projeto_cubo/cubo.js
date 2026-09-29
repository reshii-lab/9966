const cubo = document.querySelector('#cubo');
const cenario = document.querySelector('#cenario');
const pausa = document.querySelector('#pausa');
const mais = document.querySelector('#mais');
const menos = document.querySelector('#menos');
const reset = document.querySelector('#reset'); 
const rapido = document.querySelector('#rapido');
const lento = document.querySelector('#lento');

//definir e inicializar variáveis
let parado = false;
let pp=800;

pausa.addEventListener('click',function(){
    parado=!parado;
    cubo.style.animationPlayState=parado?'paused':'running';
    pausa.textContent=parado?'Continuar':'Parar';
});

mais.addEventListener('click',function(){
    pp+=100;
    cenario.style.perspective=`${pp}px`;
});
menos.addEventListener('click',function(){
    pp=Math.max(200,pp-100);
    cenario.style.perspective=`${pp}px`;
});

normal.addEventListener('click',function(){
    parado = false
    cubo.style.animationDuration='8s';
    cubo.style.animationTimingFunction='linear';
    cubo.style.animationPlayState='running';
    pausa.textContent='Parar';
});

rapido.addEventListener('click',function(){
    parado = false
    cubo.style.animationDuration='1s';
    cubo.style.animationTimingFunction='';
    cubo.style.animationPlayState='running';
    pausa.textContent='Parar';
});

lento.addEventListener('click',function(){
    parado = false
    cubo.style.animationDuration='16s';
    cubo.style.animationTimingFunction='linear';
    cubo.style.animationPlayState='running';
    pausa.textContent='Parar';
});

reset.addEventListener('click',function(){
    pp=800;
    cenario.style.perspective=`${pp}px`;
    parado=false;
    cubo.style.animationduration='8s';
    cubo.style.animationPlayState='running';
    pausa.textContent='Parar';
});