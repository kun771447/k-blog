import * as THREE from "three";

const canvas = document.querySelector("canvas.webgl") || undefined;

const scene = new THREE.Scene();

const group = new THREE.Group();

group.position.y = 1
scene.add(group);

const createCube = (color) => {
  return new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color })
  );
};

const cube1 = createCube(0xff0000);
const cube2 = createCube(0x00ff00);
cube2.position.x = 2
const cube3 = createCube(0x0000ff);
cube3.position.x = -2

group.add(cube1);
group.add(cube2);
group.add(cube3);
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
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
