// Import necessary Three.js components
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create a Three.js scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Initialize variables for mouse position and 3D object
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let object;  // 3D object placeholder

// Load the .gltf model
const loader = new GLTFLoader();
loader.load(
  `model/scene.gltf`,
  function (gltf) {
    object = gltf.scene;
    scene.add(object);  // Add model to scene
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);

// Initialize WebGL renderer and add to DOM
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

// Set camera position and lighting
camera.position.z = 550;
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, 1);
scene.add(ambientLight);

// Animate function to handle the eye movement
function animate() {
  requestAnimationFrame(animate);

  if (object) {
    object.rotation.y = (Math.PI/1.9) + (mouseX / window.innerWidth) * 3;
    object.rotation.x = -1.2 + (mouseY * 2.5) / window.innerHeight;
  }

  renderer.render(scene, camera);
}

// Update camera aspect ratio on window resize
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Track mouse movement for eye rotation
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

// Start the 3D rendering loop
animate();
