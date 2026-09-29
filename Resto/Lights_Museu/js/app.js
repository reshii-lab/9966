import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

// CENA, CÂMARA E RENDERER
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1c1917); // Fundo escuro e elegante (tom pedra/carvão)

const camera = new THREE.PerspectiveCamera(
  55, innerWidth / innerHeight, 0.1, 100
);
camera.position.set(6, 4, 8);
camera.lookAt(0, 1, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// MATERIAIS (Esculturas de exposição: Mármore, Bronze e Cerâmica)
const azul = new THREE.MeshStandardMaterial({
  color: 0xd4d4d8, // Mármore claro / Pedra
  roughness: 0.6,
  metalness: 0.05
});

const rosa = new THREE.MeshStandardMaterial({
  color: 0xb45309, // Bronze polido / Cobre antigo
  roughness: 0.3,
  metalness: 0.85
});

const verde = new THREE.MeshStandardMaterial({
  color: 0x0f766e, // Cerâmica / Jade escurecido
  roughness: 0.25,
  metalness: 0.1
});

// OBJETOS
const cubo = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.6, 1.6), azul);
cubo.position.set(-2.2, 1, 0);

const esfera = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16), rosa);
esfera.position.set(0, 1, 0);

const toro = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.3, 20, 64), verde);
toro.position.set(2.3, 1.1, 0);
toro.rotation.x = Math.PI / 2;

scene.add(cubo, esfera, toro);

// CHÃO (Soalho de madeira escura / Galeria clássica)
const chao = new THREE.Mesh(
  new THREE.PlaneGeometry(12, 8),
  new THREE.MeshStandardMaterial({ color: 0x292524, roughness: 0.5, metalness: 0.1 })
);
chao.rotation.x = -Math.PI / 2;
chao.receiveShadow = true;
scene.add(chao);

// SOMBRAS NOS OBJETOS
[cubo, esfera, toro].forEach(obj => {
  obj.castShadow = true;
  obj.receiveShadow = true;
});

// LUZ AMBIENTE (Suave e acolhedora)
const luzAmbiente = new THREE.AmbientLight(0xfff7ed, 0.25);
scene.add(luzAmbiente);

// LUZ DIRECIONAL (Foco quente de exposição de galeria)
const luz = new THREE.DirectionalLight(0xffedd5, 3.8); // Foco quente e direcionado
luz.position.set(2, 8, 4); // Foco vindo mais de cima
luz.castShadow = true;
luz.shadow.mapSize.set(1024, 1024);
scene.add(luz);

// AJUDANTE VISUAL DA LUZ
const helper = new THREE.DirectionalLightHelper(luz, 0.8);
scene.add(helper);

let rodar = true;
let sombras = true;
let intensidadeAmbiente = 0.25;
let focoDireita = true;

function animar() {
  requestAnimationFrame(animar);

  if (rodar) {
    cubo.rotation.y += 0.008;
    esfera.rotation.y += 0.006;
    toro.rotation.z += 0.008;
  }

  helper.update();
  renderer.render(scene, camera);
}
animar();

// BOTÕES
document.querySelector("#ambiente").onclick = () => {
  intensidadeAmbiente = intensidadeAmbiente === 0.25 ? 0.9 : 0.25;
  luzAmbiente.intensity = intensidadeAmbiente;
};

document.querySelector("#foco").onclick = () => {
  focoDireita = !focoDireita;
  luz.position.x = focoDireita ? 2 : -2;
  luz.position.z = focoDireita ? 4 : 2;
};

document.querySelector("#sombras").onclick = () => {
  sombras = !sombras;
  renderer.shadowMap.enabled = sombras;
  luz.castShadow = sombras;
  [cubo, esfera, toro].forEach(obj => obj.castShadow = sombras);
};

document.querySelector("#rodar").onclick = () => {
  rodar = !rodar;
};

document.querySelector("#reset").onclick = () => {
  azul.color.set(0xd4d4d8);
  rosa.color.set(0xb45309);
  verde.color.set(0x0f766e);
  azul.roughness = 0.6; azul.metalness = 0.05;
  rosa.roughness = 0.3; rosa.metalness = 0.85;
  verde.roughness = 0.25; verde.metalness = 0.1;
  luzAmbiente.color.set(0xfff7ed);
  luzAmbiente.intensity = 0.25;
  intensidadeAmbiente = 0.25;
  luz.color.set(0xffedd5);
  luz.intensity = 3.8;
  luz.position.set(2, 8, 4);
  focoDireita = true;
  sombras = true;
  renderer.shadowMap.enabled = true;
  luz.castShadow = true;
  [cubo, esfera, toro].forEach(obj => obj.castShadow = true);
  rodar = true;
};

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});