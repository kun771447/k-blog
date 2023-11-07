import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "lil-gui";
import gsap from "gsap";

const canvas = document.querySelector("canvas.webgl") || undefined;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  1,
  1000
);
camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

/**
 * Debug
 */

const gui = new dat.GUI();
gui.add(mesh.position, "y", -3, 3, 0.01);
gui.add(mesh.position, "x").min(-3).max(3).step(0.01).name("x轴");
gui.add(mesh, "visible");

const parameters = {
  color: 0xff0000,
  spinX: () => {
    gsap.to(mesh.rotation, { duration: 1, x: mesh.rotation.x + Math.PI * 2 });
  },
  spinY: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
  },
  spinZ: () => {
    gsap.to(mesh.rotation, { duration: 1, z: mesh.rotation.z + Math.PI * 2 });
  },
};

// color
gui.addColor(parameters, "color").onChange(() => {
  material.color.set(parameters.color);
});

// Functions
gui.add(parameters, "spinX");
gui.add(parameters, "spinY");
gui.add(parameters, "spinZ");

// close debug
// gui.hide();

// Axes Helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
