import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(12, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.background = new THREE.Color(0x000000);
camera.position.set(0, 0, 10);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

let loadedModel;  
const gltfloader = new GLTFLoader();
gltfloader.load('./models/scene.gltf', (gltfScene) => {
    loadedModel = gltfScene;
   // Set initial position of the model
   gltfScene.scene.position.set(0, -3, 0);  // x, y, z coordinates (move model to origin)
  
   // Optionally set initial rotation and scale (if needed)
   gltfScene.scene.rotation.set(0, 0, 0);  // Euler angles (x, y, z in radians)
   gltfScene.scene.scale.set(2, 2, 2);  // Scale the model (1 = default size)
    scene.add(gltfScene.scene);
})

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);  // Soft white light
directionalLight.position.set(5, 10, 7); // Position it to shine from above
scene.add(directionalLight);

const pointLight1 = new THREE.PointLight(0xffffff, 30, 100); // Bright white light
pointLight1.position.set(2, 2, 4); // Adjust position as needed for the model
scene.add(pointLight1);


const pointLight2 = new THREE.PointLight(0xffffff, 30, 100); // Bright white light
pointLight2.position.set(2, 2, -2); // Adjust position as needed for the model
scene.add(pointLight2);

const sphereSize = 0.1;
const pointLightHelper = new THREE.PointLightHelper(pointLight1, sphereSize);
scene.add(pointLightHelper);

const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, sphereSize);
scene.add(pointLightHelper2);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  // Adjust the canvas when the window is resized
  window.addEventListener("resize", () => {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });