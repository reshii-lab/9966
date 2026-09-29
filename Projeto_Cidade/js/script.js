const cidade=document.querySelector("#cidade");
let rotacaoX=-25;
let rotacaoY=25;
let zoom=1;
let auto=false;
let timer=0;

// Criar atualizarCidade()

function atualizarCidade(){
    cidade.style.transform=`rotateX(${rotacaoX}deg) rotateY(${rotacaoY}deg) scale(${zoom})`;
    }
// Programar os botões

document.querySelector("#esq").addEventListener("click",()=>{rotacaoY-=10;atualizarCidade()});

document.querySelector("#dir").addEventListener("click",()=>{rotacaoY+=10;atualizarCidade()});

document.querySelector("#cima").addEventListener("click",()=>{rotacaoX-=10;atualizarCidade()});

document.querySelector("#baixo").addEventListener("click",()=>{rotacaoX+=10;atualizarCidade()});

document.querySelector("#mais").addEventListener("click",()=>{zoom+=0.1;atualizarCidade()});

document.querySelector("#menos").addEventListener("click",()=>{zoom-=0.1;atualizarCidade()});

document.querySelector("#reset").addEventListener("click",()=>{
    rotacaoX=-25;
    rotacaoY=25;
    zoom=1;
    clearInterval(timer);
    auto=false;
    atualizarCidade()});

// Extra: modo automático

document.querySelector("#auto").addEventListener("click", function() {
    auto = !auto;
    this.textContent = auto ? "Parar" : "Auto";
    if(auto){
        timer = setInterval(() => {
            rotacaoY += 1;
            rotacaoX += 1;
            atualizarCidade();
        }, 100);
    } else {
        clearInterval(timer);
    }
});