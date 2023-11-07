import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "lil-gui";

import doorColor from "./static/textures/door/color.jpg";
import doorAlpha from './static/textures/door/alpha.jpg';
import doorNormal from "./static/textures/door/normal.jpg";
import doorMeatlness from "./static/textures/door/metalness.jpg";
import doorRoughtness from "./static/textures/door/roughness.jpg";
import matcap from "./static/textures/matcaps/1.png";
import gradient from "./static/textures/gradients/3.jpg";

const canvas = document.querySelector("canvas.webgl") || undefined;

/**
* Debug
*/
const gui = new dat.GUI()

const scene = new THREE.Scene();

// 纹理加载器
const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load(doorColor);
const doorAlphaTexture = textureLoader.load(doorAlpha);
const doorNormalTexture = textureLoader.load(doorNormal);
const doorMetalnessTexture  = textureLoader.load(doorMeatlness);
const doorRoughnessTexture = textureLoader.load(doorRoughtness);
const matcapTexture = textureLoader.load(matcap);
const gradientTexture = textureLoader.load(gradient);

// const material = new THREE.MeshBasicMaterial({
    // map: doorColorTexture
// });

// material.map = doorColorTexture;
// material.color = new THREE.Color("#ff0000");
// material.wireframe = true;
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;
// material.opacity = 0.5;

// 显示面
// 默认 FrontSide(正面)、BackSide(背面)、DoubleSide(双面)
// material.side = THREE.DoubleSide;

/**
 * 法线材质
 */
// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

/**
 * MeshMatcap 材质
 */

// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture

/**
 * 深度材质
 */
// const material = new THREE.MeshDepthMaterial();

/**
 * Lambert 材质
 */
// const material = new THREE.MeshLambertMaterial();

/**
 * Phong 材质
 */

// const material = new THREE.MeshPhongMaterial()

// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

/**
 * Toon 材质
 */

// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture;
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.45;
material.roughness = 0.65;

material.map = doorColorTexture;
// material.alphaMap = doorAlphaTexture;

gui.add(material, 'metalness').min(0).max(1).step(0.0001);
gui.add(material, 'roughness').min(0).max(1).step(0.0001);


/**
 * 灯光
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.x = 0
pointLight.position.y = 0
pointLight.position.z = 2
scene.add(pointLight)

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);
sphere.position.x = -1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
);

torus.position.x = 1.5;

scene.add(sphere, plane, torus);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  1000
);
// camera.position.x = 1
// camera.position.y = 1
camera.position.z = 2
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

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

//   sphere.rotation.y = 0.1 * elapsedTime;
//   plane.rotation.y = 0.1 * elapsedTime;
//   torus.rotation.y = 0.1 * elapsedTime;

//   sphere.rotation.x = 0.15 * elapsedTime;
//   plane.rotation.x = 0.15 * elapsedTime;
//   torus.rotation.x = 0.15 * elapsedTime;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
