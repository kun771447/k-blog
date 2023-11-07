import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import * as dat from "lil-gui";

const gui = new dat.GUI();

const canvas = document.querySelector("canvas.webgl") || undefined;

const scene = new THREE.Scene();

/**
 * ligth 灯光
 */

const ambientLight = new THREE.AmbientLight();
ambientLight.color = new THREE.Color(0xffffff);
ambientLight.intensity = 0.5;
gui.add(ambientLight, "intensity").min(0).max(1).step(0.0001);

scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
scene.add(hemisphereLight);
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
scene.add(hemisphereLightHelper)

const pointLight = new THREE.PointLight(0xff9000, 0.5);
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointLightHelper)

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1);
rectAreaLight.position.set(-1.5, 0, 1.5);
gui.add(rectAreaLight.position, "x").min(0).max(10).step(0.1);
gui.add(rectAreaLight.position, "y").min(0).max(10).step(0.1);
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper);
scene.add(rectAreaLight);

const spotLight = new THREE.SpotLight(0x78ff00, 2, 10, Math.PI * 0.1, 0.25, 1)
spotLight.position.set(0, 2, 3);
spotLight.target.position.x = - 0.75
scene.add(spotLight.target);
scene.add(spotLight)
const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)

const material = new THREE.MeshPhysicalMaterial({});

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -1;

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
);
torus.position.x = 1.5;

scene.add(sphere, plane, torus, cube);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

// 物体到相机间的距离
// console.log(mesh.position.distanceTo(camera.position));

scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  spotLightHelper.update();
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
