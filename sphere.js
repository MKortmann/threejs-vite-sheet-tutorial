
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';

export default function() {

// Create the scene
const scene = new THREE.Scene();

// more detailed geometry we need blender
// Create the sphere
const geometry = new THREE.SphereGeometry(6, 64, 64);

const material = new THREE.MeshStandardMaterial({
  color: '#00ff83'
})

const sphereMesh = new THREE.Mesh(geometry, material);

scene.add(sphereMesh);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Light
const light = new THREE.PointLight('#ffffff', 70, 100);
light.position.set(10,10, 10);
scene.add(light)


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20;


// Controls
const controls = new OrbitControls(camera, document.querySelector('.sphere'));
controls.enableDamping = true;
controls.enablePan = false;
// controls.enableZoom = false;
controls.autoRotate = true
controls.autoRotateSpeed = 5


// Renderer
const webGLRenderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('.sphere'),
});

// default is 1. Increase the pixel ratio for better quality.
webGLRenderer.setPixelRatio(2);
webGLRenderer.setSize(sizes.width, sizes.height);



// Animate
webGLRenderer.render(scene, camera);


// Resize
window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  
  // Update renderer
  webGLRenderer.setSize(sizes.width, sizes.height);
  
});

const loop = () => {
  controls.update();
  webGLRenderer.render(scene,camera);
  window.requestAnimationFrame(loop)
}

loop()

// Timeline animation
const tl = gsap.timeline({ defaults: { duration: 1.5} })
tl.fromTo(sphereMesh.scale, {x: 0, y: 0, z: 0}, {x:1, y: 1, z:1});
tl.fromTo("nav", { y: "-100%"}, { y: "0%", duration: 1}, "-=1.5")


}
