import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';

VRButton.createButton();
const scene = new THREE.Scene(); // creates the scene (NEEDED think like just scene that u will switch on to.)

const renderer = new THREE.WebGLRenderer(); // how it renders onto the  screen
renderer.setSize(window.innerWidth, window.innerHeight); // sets the size of the render/
//renderer.setClearColor(0xffffff, 1); //turns the background white
document.body.appendChild(renderer.domElement); // how the thing actually renders it i think ?

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Materials
const material = new THREE.MeshBasicMaterial({ color: 0x00fff00, wireframe: false }); // green sides

// Geometry
// 3rd one is height
const geometry = new THREE.CylinderGeometry(0.05, 0.05, 10, 64, 1, false);

// Mesh with multiple materials
const cylinder = new THREE.Mesh(geometry, material);
scene.add(cylinder);
cylinder.rotation.x = 3.14 / 2;
cylinder.position.x = 0.5;
camera.position.z = 10;

const positions = [];

function isPositionClose(newX, newY, threshold = 0.1) {
  for (let pos of positions) {
    let d = Math.sqrt((pos.x - newX) ** 2 + (pos.y - newY) ** 2);
    if (d < threshold) {
      return true; // Position is too close to an existing one
    }
  }
  return false; // Position is fine
}

const adjustments = [
  { rotationX: 3.14 / 2, positionX: 0.5, positionY: 0.25 },
  { rotationX: -3.14 / 2, positionX: -0.5, positionY: 0.25 },
  { rotationX: -3.14 / 2, positionX: -0.5, positionY: -0.25 },
  { rotationX: 3.14 / 2, positionX: 0.5, positionY: -0.25 }
];

adjustments.forEach(adjustment => {
  for (let i = 0; i < 5; i++) {
    let newX = adjustment.positionX - (Math.random() * (i / 10));
    let newY = adjustment.positionY + (Math.random() * (i / 10));

    if (!isPositionClose(newX, newY)) {
      const temp = new THREE.Mesh(geometry, material);
      scene.add(temp);
      temp.rotation.x = adjustment.rotationX;
      temp.position.x = newX;
      temp.position.y = newY;
      // Store the position
      positions.push({ x: newX, y: newY });
    } else {
      console.log("Position too close, adjusting or skipping...");
    }
  }
});

// Create an animation loop
function animate() {
  requestAnimationFrame(animate);

  camera.position.z -= 0.01;

  renderer.render(scene, camera);
}

animate();