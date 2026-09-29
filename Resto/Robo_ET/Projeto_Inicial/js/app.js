import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x030712); // Fundo espaço profundo

const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 100);
camera.position.set(0, 0.5, 9);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const robo = new THREE.Group();
scene.add(robo);

function mesh(geometria, cor) {
  return new THREE.Mesh(geometria, new THREE.MeshBasicMaterial({ color: cor }));
}

// 1. CORPO
const corpo = mesh(new THREE.BoxGeometry(1.2, 1.6, 0.8), 0x10b981);
robo.add(corpo);

// 2. CABEÇA 
const cabeca = mesh(new THREE.BoxGeometry(2.2, 1.4, 2.2), 0x10b981);
cabeca.position.y = 1.5;
robo.add(cabeca);

// BRAÇOS
const bracoE = mesh(new THREE.BoxGeometry(0.25, 2.2, 0.3), 0x059669);
bracoE.position.set(-0.85, 0.6, 0);
const bracoD = bracoE.clone();
bracoD.position.x = 0.85;
robo.add(bracoE, bracoD);

// 3. OLHOS ALIENÍGENAS 
// Olho Central Gigante (Alteração de Dimensão 2 & Posição 1)
const olhoCentro = mesh(new THREE.SphereGeometry(0.45, 16, 16), 0xa855f7);
olhoCentro.position.set(0, 1.75, 1.12);

// Olhos Laterais
const olhoE = mesh(new THREE.SphereGeometry(0.2, 16, 16), 0xa855f7);
olhoE.position.set(-0.65, 1.5, 1.05);

const olhoD = mesh(new THREE.SphereGeometry(0.2, 16, 16), 0xa855f7);
olhoD.position.set(0.65, 1.5, 1.05);

robo.add(olhoCentro);
robo.add(olhoE);
robo.add(olhoD);

// PERNAS 
const pernaE = mesh(new THREE.BoxGeometry(0.35, 1.2, 0.35), 0x047857);
pernaE.position.set(-0.4, -1.3, 0);
const pernaD = pernaE.clone();
pernaD.position.x = 0.48;
robo.add(pernaE, pernaD);

// ANTENA (Aumentada)
const haste = mesh(new THREE.CylinderGeometry(0.1, 0.1, 1.4, 12), 0xe2e8f0);
haste.position.y = 2.9; // Subida para compensar a altura maior

const ponta = mesh(new THREE.SphereGeometry(0.14, 16, 8), 0xef4444);
ponta.position.y = 3.6; // Ajustada para o topo da nova haste

robo.add(haste);
robo.add(ponta);

let velocidade = 1;
let pausado = false;
let acenar = false;
let tempo = 0;

function animar() {
  requestAnimationFrame(animar);
  if (!pausado) {
    robo.rotation.y += 0.008 * velocidade;
    tempo += 0.05 * velocidade;
    if (acenar) bracoD.rotation.z = Math.sin(tempo) * 1.8;
  }
  renderer.render(scene, camera);
}
animar();

document.querySelector("#pausa").onclick = function() {
  pausado = !pausado;
  this.textContent = pausado ? "Continuar" : "Pausar";
};
document.querySelector("#lento").onclick = () => velocidade = 1;
document.querySelector("#normal").onclick = () => velocidade = 3;
document.querySelector("#rapido").onclick = () => velocidade = 7;
document.querySelector("#acenar").onclick = function() {
  acenar = !acenar;
  this.textContent = acenar ? "Parar braço" : "Acenar";
  if (!acenar) bracoD.rotation.z = 0;
};
document.querySelector("#reset").onclick = () => {
  velocidade=1; pausado=false; acenar=false; tempo=0;
  robo.rotation.set(0,0,0); bracoD.rotation.set(0,0,0);
  document.querySelector("#pausa").textContent="Pausar";
  document.querySelector("#acenar").textContent="Acenar";
};
addEventListener("resize", () => {
  camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight);
});