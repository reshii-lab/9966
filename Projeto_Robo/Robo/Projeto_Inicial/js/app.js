import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f172a);

const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 100);
camera.position.set(0, 0.5, 8);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const robo = new THREE.Group();
scene.add(robo);

function mesh(geometria, cor) {
  return new THREE.Mesh(geometria, new THREE.MeshBasicMaterial({ color: cor }));
}

// CORPO
const corpo = mesh(new THREE.BoxGeometry(1.6, 2, 0.9), 0xFF0000);
robo.add(corpo);

// CABEÇA
const cabeca = mesh(new THREE.BoxGeometry(1.5, 1.05, 1), 0xfacc15);
cabeca.position.y = 1.65;
robo.add(cabeca);

// BOCA
const boca = mesh(
new THREE.BoxGeometry(0.5, 0.3, 0.1),
0x111111
);
boca.position.set(0., 1.5, 0.51);
robo.add(boca);

// BRAÇOS
const bracoE = mesh(new THREE.BoxGeometry(0.35, 1.8, 0.4), 0xf472b6);
bracoE.position.set(-1.5, 0.05, 0);
const bracoD = bracoE.clone();
bracoD.position.x = 1.5;
robo.add(bracoE, bracoD);

// PERNAS
const pernaE = mesh(new THREE.BoxGeometry(0.5, 3, 0.55), 0x4ade80);
pernaE.position.set(-0.48, -1.75, 0);
const pernaD = pernaE.clone();
pernaD.position.x = 0.48;
robo.add(pernaE, pernaD);

// OLHOS
const olhoE = mesh(new THREE.SphereGeometry(0.20, 16, 8), 0x111111);
olhoE.position.set(-0.5, 1.75, 0.51);
const olhoD = olhoE.clone();
olhoD.position.x = 0.5;
robo.add(olhoE, olhoD);

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