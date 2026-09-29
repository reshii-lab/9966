const img = document.querySelector('#img');
const titulo = document.querySelector('#titulo');
const rodar = document.querySelector('#rodar');
const crescer = document.querySelector('#crescer');
const encolher = document.querySelector('#encolher');
const mudarCor = document.querySelector('#mudarCor');
const reiniciar = document.querySelector('#reiniciar');

let angulo = 0;
let tamanho = 1;
let cor = 0;


function atualiza_img() {
    img.style.transform = `rotateX(${angulo/2}deg) rotateY(${angulo}deg) scale(${tamanho})`;
}

rodar.addEventListener('click', () => {
   angulo += 90;
    atualiza_img();
});

crescer.addEventListener('click', () => {
    tamanho += 0.1;
    atualiza_img();
});

encolher.addEventListener('click', () => {
    tamanho -= 0.1;
    atualiza_img();
});

mudarCor.addEventListener('click', () => {
    cor +=10;
    img.style.filter = `grayscale(${cor}%)`;
    atualiza_img();
});

reiniciar.addEventListener('click', () => {
    angulo = 0;
    tamanho = 1;
    cor = 0;
    img.style.filter = 'none';
    atualiza_img();
});
