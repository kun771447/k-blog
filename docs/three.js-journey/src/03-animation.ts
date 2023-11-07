import * as THREE from "three";
import gsap from "gsap";

const canvas = document.querySelector("canvas.webgl") || undefined;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
// mesh.position.x = 0.7;
// mesh.position.y = 2;
// // mesh.position.z = 0.7;

// mesh.position.normalize();
console.log(mesh.position.length());

// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25
// mesh.rotation.z = Math.PI * 0.25
scene.add(mesh);

// Axes Helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

const sizes = {
  width: 800,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

// 物体到相机间的距离
console.log(mesh.position.distanceTo(camera.position));

scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);

gsap.to(mesh.position, {
  duration: 1,
  delay: 1,
  x: 2,
  onUpdate: () => {
    renderer.render(scene, camera);
  },
});
gsap.to(mesh.position, {
  duration: 1,
  delay: 2,
  x: 0,
  onUpdate: () => {
    renderer.render(scene, camera);
  },
});

// const clock = new THREE.Clock();
// const tick = () => {
//     const elapsedTime = clock.getElapsedTime();

//     // mesh.rotation.y = elapsedTime;

//     renderer.render(scene, camera);

//     window.requestAnimationFrame(tick);
// }

// tick();

// let time = Date.now();
// const tick = () => {
//     const currentTime = Date.now();
//     const deltaTime = currentTime - time;

//     time = currentTime;

//     mesh.rotation.y += 0.001 * deltaTime;

//     renderer.render(scene, camera);

//     window.requestAnimationFrame(tick);
// }

// tick();
