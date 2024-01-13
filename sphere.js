
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextureLoader } from 'three';
import gsap from 'gsap';

export function sphereScript() {

// Create the scene
const scene = new THREE.Scene();

// more detailed geometry we need blender
// Create the sphere
const geometry = new THREE.SphereGeometry(1, 64, 64);

// Create the texture loader
const textureLoader = new TextureLoader();

const moonTexture = textureLoader.load('moon.jpg');

const material = new THREE.MeshPhongMaterial({
  map: moonTexture, // Assign the loaded texture to the map property
});

const sphereMesh = new THREE.Mesh(geometry, material);

scene.add(sphereMesh);

// World

const worldGeometry = new THREE.SphereGeometry(10, 100, 100);

const worldTexture = textureLoader.load('world.jpg')

const worldMaterial = new THREE.MeshBasicMaterial (
  { color: 0xffffff ,
  map: worldTexture ,
  side: THREE.BackSide
  }
);

const world = new THREE.Mesh( worldGeometry, worldMaterial);

scene.add( world)


const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Light
const light = new THREE.PointLight('#ffffff', 300, 1000);
light.position.set(0,0,10);
scene.add(light)


// Camera
const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height, 0.1 , 100);
camera.position.set(0,0,3)


// Controls
const controls = new OrbitControls(camera, document.querySelector('.sphere'));
controls.enableDamping = true;
controls.enablePan = false;
// controls.enableZoom = false;
controls.autoRotate = true
controls.autoRotateSpeed = 1


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
// window.addEventListener('resize', () => {
//   // Update sizes
//   sizes.width = window.innerWidth;
//   sizes.height = window.innerHeight;

//   // Update camera
//   camera.aspect = sizes.width / sizes.height;
//   camera.updateProjectionMatrix();
  
//   // Update renderer
//   webGLRenderer.setSize(sizes.width, sizes.height);
  
// });

const loop = () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  
  // Update renderer
  webGLRenderer.setSize(sizes.width, sizes.height);

  controls.update();
  webGLRenderer.render(scene,camera);
  window.requestAnimationFrame(loop)
}

loop()

// Timeline animation
const timeLineAnimation = gsap.timeline({ defaults: { duration: 1.5} })
timeLineAnimation.fromTo(sphereMesh.scale, {x: 0, y: 0, z: 0}, {x:1, y: 1, z:1});
timeLineAnimation.fromTo("nav", { y: "-100%"}, { y: "0%", duration: 1}, "-=1.5");
}
