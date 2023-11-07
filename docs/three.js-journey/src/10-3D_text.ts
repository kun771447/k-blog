import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import matcap from "./static/textures/matcaps/1.png";

const canvas = document.querySelector("canvas.webgl") || undefined;

const scene = new THREE.Scene();

// 纹理加载器
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load(matcap);

const fontLoader = new FontLoader();
fontLoader.load(
  "/src/static//fonts/helvetiker_regular.typeface.json",
  (font) => {
    console.log("loaded");
    const textGeometry = new TextGeometry("Hello Three.js", {
      font: font,
      size: 0.5,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    });
    // textGeometry.computeBoundingBox()
    // textGeometry.translate(
    //     -textGeometry.boundingBox!.max.x * 0.5,
    //     -textGeometry.boundingBox!.max.y * 0.5,
    //     -textGeometry.boundingBox!.max.z * 0.5
    //     )
    textGeometry.center();
    // const textMaterial = new THREE.MeshBasicMaterial({ wireframe: true });
    const textMaterial = new THREE.MeshMatcapMaterial({
      matcap: matcapTexture,
    });
    const text = new THREE.Mesh(textGeometry, textMaterial);
    scene.add(text);

    const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
    const donutMaterial = new THREE.MeshMatcapMaterial({
      matcap: matcapTexture,
    });
    
    for (let i = 0; i < 100; i++) {
      const donut = new THREE.Mesh(donutGeometry, donutMaterial);
      donut.position.x = (Math.random() - 0.5) * 10;
      donut.position.y = (Math.random() - 0.5) * 10;
      donut.position.z = (Math.random() - 0.5) * 10;
      donut.rotation.x = Math.random() * Math.PI;
      donut.rotation.y = Math.random() * Math.PI;
      const scale = Math.random();
      donut.scale.set(scale, scale, scale);
      scene.add(donut);
    }
  }
);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);

// scene.add(mesh);

// Axes Helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

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
