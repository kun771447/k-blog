import * as Three from "three";

const canvas = document.querySelector("canvas.webgl") || undefined;

const scene = new Three.Scene();

const geometry = new Three.BoxGeometry(1, 1, 1);
const material = new Three.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new Three.Mesh(geometry, material);
mesh.position.x = 1;
// mesh.position.y = 2;
// // mesh.position.z = 0.7;

// mesh.position.normalize();
console.log(mesh.position.length());

// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25
// mesh.rotation.z = Math.PI * 0.25
scene.add(mesh);

// Axes Helper
const axesHelper = new Three.AxesHelper();
scene.add(axesHelper);

const sizes = {
  width: 800,
  height: 600,
};

const camera = new Three.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;


// 物体到相机间的距离
console.log(mesh.position.distanceTo(camera.position));

scene.add(camera);

const renderer = new Three.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
