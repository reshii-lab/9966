import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

// 1. Criar Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1e293b);

const light = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(light);

// Sol (DirectionalLight)
const sol = new THREE.DirectionalLight(0xffffff, 1.8);
sol.position.set(5, 8, 4);
sol.castShadow = true;
sol.shadow.mapSize.width = 1024;
sol.shadow.mapSize.height = 1024;
sol.shadow.camera.near = 0.5;
sol.shadow.camera.far = 25;
scene.add(sol);

// 2. Criar Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 8);

// 3. Criar Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// 4. Criar um chão para receber a sombra
const planoGeom = new THREE.PlaneGeometry(20, 20);
const planoMat = new THREE.MeshStandardMaterial({ color: 0x334155 });
const plano = new THREE.Mesh(planoGeom, planoMat);
plano.rotation.x = -Math.PI / 2;
plano.position.y = -2;
plano.receiveShadow = true; // Permite receber sombra
scene.add(plano);

// 5. Criar Objetos (Usando MeshStandardMaterial + castShadow)
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshStandardMaterial({ color: 0xc0dee0, roughness: 0.6, metalness: 0.2 })
);
cube.position.set(-3, 0, 0);
cube.castShadow = true;
scene.add(cube);

const esfera = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 16),
  new THREE.MeshStandardMaterial({ color: 0x2bcdeec, roughness: 0.2, metalness: 0.1})
);
esfera.position.set(0, 0, 0);
esfera.castShadow = true;
scene.add(esfera);

const cone = new THREE.Mesh(
  new THREE.ConeGeometry(1, 2, 32),
  new THREE.MeshStandardMaterial({ color: 0x9900ff, roughness: 0.4 })
);
cone.position.set(3, 0, 0);
cone.castShadow = true;
scene.add(cone);

// 6. Variáveis de controle
let velocidade = 1;
let pausado = false;

// 7. Criar função animar()
function animar() {
    requestAnimationFrame(animar);
    if (!pausado) {
      cube.rotation.x += 0.01 * velocidade;
      cube.rotation.y += 0.01 * velocidade;

      esfera.rotation.y += 0.01 * velocidade;

      cone.rotation.y += 0.01 * velocidade;
      cone.rotation.x += 0.01 * velocidade;
    }
    renderer.render(scene, camera);
}

// 8. Iniciar a animação
animar();

// 9. Eventos
document.getElementById("pausa").addEventListener("click", () => {
  pausado = !pausado;
});

document.getElementById("lento").addEventListener("click", () => {
  velocidade = 0.5;
});

document.getElementById("normal").addEventListener("click", () => {
  velocidade = 1;
});

document.getElementById("rapido").addEventListener("click", () => {
  velocidade = 2;
});

document.getElementById("reset").addEventListener("click", () => {
  cube.rotation.set(0, 0, 0);
  esfera.rotation.set(0, 0, 0);
  cone.rotation.set(0, 0, 0);
});