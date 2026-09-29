import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f172a);

const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 100);
camera.position.set(0, 0.5, 10); // Ligeiramente afastada para caber a antena gigante

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const robo = new THREE.Group();
scene.add(robo);

function mesh(geometria, cor) {
  return new THREE.Mesh(geometria, new THREE.MeshBasicMaterial({ color: cor }));
}

// CORPO
const corpo = mesh(new THREE.BoxGeometry(1.0, 1.1, 0.7), 0xFF0000);
corpo.position.y = -0.3;
robo.add(corpo);

// CABEÇA 
const cabeca = mesh(new THREE.BoxGeometry(2.4, 2.0, 1.8), 0xfacc15);
cabeca.position.y = 1.25;
robo.add(cabeca);

// BRAÇOS 
const geometriaBraco = new THREE.BoxGeometry(0.3, 3.2, 0.35);
geometriaBraco.translate(0, -1.6, 0); // Define o pivô de rotação no topo (ombro)

const bracoE = mesh(geometriaBraco, 0xf472b6);
bracoE.position.set(-0.75, 0.1, 0);

const bracoD = mesh(geometriaBraco, 0xf472b6);
bracoD.position.set(0.75, 0.1, 0);

robo.add(bracoE);
robo.add(bracoD);

// PERNAS 
const pernaE = mesh(new THREE.BoxGeometry(0.4, 0.7, 0.45), 0x4ade80);
pernaE.position.set(-0.3, -1.2, 0);

const pernaD = mesh(new THREE.BoxGeometry(0.4, 0.7, 0.45), 0x4ade80);
pernaD.position.set(0.3, -1.2, 0);

robo.add(pernaE);
robo.add(pernaD);

// OLHOS 
const olhoE = mesh(new THREE.SphereGeometry(0.35, 16, 16), 0x111111);
olhoE.position.set(-0.55, 1.4, 0.92);

const olhoD = mesh(new THREE.SphereGeometry(0.35, 16, 16), 0x111111);
olhoD.position.set(0.55, 1.4, 0.92);

robo.add(olhoE);
robo.add(olhoD);

// ANTENA 
const haste = mesh(new THREE.CylinderGeometry(0.06, 0.06, 3.2, 12), 0xe2e8f0);
haste.position.y = 3.85;

const ponta = mesh(new THREE.SphereGeometry(0.4, 16, 16), 0xef4444);
ponta.position.y = 5.45;

robo.add(haste);
robo.add(ponta);

// CONTROLES DE ANIMAÇÃO E ESTADO
let velocidade = 1;
let pausado = false;
let acenar = false;
let tempo = 0;

function animar() {
  requestAnimationFrame(animar);
  if (!pausado) {
    robo.rotation.y += 0.008 * velocidade;
    tempo += 0.05 * velocidade;
    
    if (acenar) {
      // Aceno amplo articulado pelo ombro
      bracoD.rotation.z = -1.2 + Math.sin(tempo * 2) * 0.9;
    }
  }
  renderer.render(scene, camera);
}
animar();

// EVENTOS DOS BOTÕES
document.querySelector("#pausa").onclick = function() {
  pausado = !pausado;
  this.textContent = pausado ? "Continuar" : "Pausar";
};

document.querySelector("#lento").onclick = () => velocidade = 0.4;
document.querySelector("#normal").onclick = () => velocidade = 1;
document.querySelector("#rapido").onclick = () => velocidade = 2.5;

document.querySelector("#acenar").onclick = function() {
  acenar = !acenar;
  this.textContent = acenar ? "Parar braço" : "Acenar";
  if (!acenar) bracoD.rotation.z = 0;
};

document.querySelector("#reset").onclick = () => {
  velocidade = 1;
  pausado = false;
  acenar = false;
  tempo = 0;
  robo.rotation.set(0, 0, 0);
  bracoD.rotation.set(0, 0, 0);
  document.querySelector("#pausa").textContent = "Pausar";
  document.querySelector("#acenar").textContent = "Acenar";
};

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});