
import * as THREE from 'three';

// Create the scene
const scene = new THREE.Scene();

// more detailed geometry we need blender
// Create the sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);

const material = new THREE.MeshStandardMaterial({
  color: '#00ff83'
})

const sphereMesh = new THREE.Mesh(geometry, material);

scene.add(sphereMesh);

// Light
const light = new THREE.PointLight('#ffffff', 70, 100);
light.position.set(0,10,0);
scene.add(light)
// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
camera.position.z = 20;

// Renderer
const webGLRenderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('.webgl'),
});

webGLRenderer.setSize(window.innerWidth, window.innerHeight);



// Animate
webGLRenderer.render(scene, camera);
