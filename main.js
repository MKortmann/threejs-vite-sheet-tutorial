import initSphere from '/sphere.js';
import initCube from '/cube.js';

// main.js
document.getElementById('sphereLink').addEventListener('click', async function(event) {
  event.preventDefault();
  // Load the sphere script dynamically
  const { default: sphereScript } = await import('/sphere.js');
  document.querySelector('.sphere').style.zIndex = '1';
  document.querySelector('.cube').style.zIndex = '0';
  // Run the script
  sphereScript();  
});

document.getElementById('cubeLink').addEventListener('click', async function(event) {
  event.preventDefault();
  // Load the cube script dynamically
  const { default: cubeScript } = await import('/cube.js');
  document.querySelector('.sphere').style.zIndex = '0';
  document.querySelector('.cube').style.zIndex = '1';
  // Run the script
  cubeScript();

});

document.addEventListener('DOMContentLoaded', async () => {
  // Trigger a click on the sphere link
  document.getElementById('sphereLink').click();
});
