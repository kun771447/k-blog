import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import colorJPG from "./static/textures/door/color.jpg";

/**
 * Textures
 */
// 加载图像
// const image = new Image();
// const texture = new THREE.Texture(image);
// image.addEventListener("load", () => {
//   texture.needsUpdate = true;
// });
// image.src = colorJPG;

// 纹理加载器
// const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load(
//   colorJPG,
//   () => {
//     console.log("loading finished");
//   },
//   () => {
//     console.log("loading progressing");
//   },
//   () => {
//     console.log("loading error");
//   }
// );

const loadingManager = new THREE.LoadingManager();
(loadingManager.onStart = () => {
  console.log("loading finished");
}),
  (loadingManager.onProgress = () => {
    console.log("loading progressing");
  }),
  (loadingManager.onError = () => {
    console.log("loading error");
  });

const textureLoader = new THREE.TextureLoader(loadingManager);
const texture = textureLoader.load(colorJPG);

const canvas = document.querySelector("canvas.webgl") || undefined;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  map: texture,
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