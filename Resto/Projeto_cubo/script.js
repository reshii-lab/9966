//alert("Bem vindo ao Laboratório de multimédia!");
// cria uma variável que seleciona o elemento com o id "titulo"
const titulo=document.querySelector("#titulo");
// altera cor do titulo
titulo.style.color="wheat";
// altera o tamanho do titulo
titulo.style.fontSize="20px";
// altera conteúdo do titulo
titulo.innerHTML=" Laboratório de Multimédia - Exercício 3";

//cria uma variável que seleciona o elemento com o id "img"
const img=document.querySelector("#img");

// criar função rodar

function rodar(){
    img.style.transform="rotate(90deg)";

}

function crescer(){
    img.style.transform="scale(1.1)";
}

function encolher(){
    img.style.transform="scale(0.9)";
}   

function mudarCor(){
    img.style.backgroundColor="red";
}

function reiniciar(){
    img.style.transform="rotate(0deg)";
    img.style.backgroundColor="white";
}