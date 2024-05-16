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
const material = new THREE.MeshBasicMaterial({ color: 0x00fff00, wireframe: true }); // green sides

// Geometry
// 3rd one is height
const geometry = new THREE.CylinderGeometry(0.03, 0.03, 1, 64, 1, false);

// add more and change the heights/positionZ mainly
const initial = [
  { rotationX: 3.14 / 2, positionX: 0.42, positionY: 0.25, positionZ: 10 },
  { rotationX: -3.14 / 2, positionX: -0.3, positionY: 0.34561, positionZ: 15 },
  { rotationX: -3.14 / 2, positionX: -0.5, positionY: -0.4, positionZ: 6 },
  { rotationX: 3.14 / 2, positionX: 0.4, positionY: -0.2, positionZ: 13 },
  { rotationX: 3.14 / 2, positionX: 0, positionY: .38, positionZ: 14 },
  { rotationX: -3.14 / 2, positionX: 0, positionY: -.35, positionZ: 4 },
  { rotationX: -3.14 / 2, positionX: -0.2, positionY: -.22, positionZ: 7 },
  { rotationX: -3.14 / 2, positionX: 0.47, positionY: -.11, positionZ: 9 },
  { rotationX: -3.14 / 2, positionX: -0.36, positionY: -.18, positionZ: 11 },
  { rotationX: -3.14 / 2, positionX: 0.41, positionY: -.18, positionZ: 2 },
  { rotationX: -3.14 / 2, positionX: -0.324, positionY: -.28, positionZ: 3 }
];

// create the initial cylinders towards the beginning of the session
initial.forEach(initials => {
  const cylinder = new THREE.Mesh(geometry, material);
  scene.add(cylinder);
  cylinder.rotation.x = initials.rotationX;
  cylinder.position.x = initials.positionX;
  cylinder.position.y = initials.positionY;
  cylinder.position.z = initials.positionZ;
});
camera.position.z = 20;



const positions = [];

function isPositionClose(newX, newY, threshold) {
  for (let pos of positions) {
    let d = Math.sqrt((pos.x - newX) ** 2 + (pos.y - newY) ** 2);
    if (d < threshold) {
      return true; // Position is too close to an existing one
    }
  }
  return false; // Position is fine
}

// change some of the positionZs and the heights of them to make it better
const adjustments = [
  { rotationX: 3.14 / 2, positionX: 0.3, positionY: 0.2 },
  { rotationX: -3.14 / 2, positionX: -0.3, positionY: 0.2 },
  { rotationX: -3.14 / 2, positionX: -0.3, positionY: -0.2 },
  { rotationX: 3.14 / 2, positionX: 0.3, positionY: -0.2 },
  { rotationX: 3.14 / 2, positionX: 0, positionY: .2 },
  { rotationX: -3.14 / 2, positionX: 0, positionY: -.2 }
];

adjustments.forEach(adjustment => {
  for (let i = 0; i < 5; i++) {
    // fine tune the numbers later because lowkey want it to be closer to the middle a little bit
    let newX = adjustment.positionX + (Math.random() * (i / 12));
    let newY = adjustment.positionY + (Math.random() * (i / 12));
    let newZ = -5 + (Math.random() * 2);
    console.log(`Generated newX: ${newX}, newY: ${newY}`); // Log newX and newY

    // doesn't spawn in the middle (fine tune the numbers later)
    // if (isPositionClose(0, 0, 0.1)) {
    //   continue;
    // }

    if (!isPositionClose(newX, newY, 0.1)) {
      const temp = new THREE.Mesh(geometry, material);
      scene.add(temp);
      temp.rotation.x = adjustment.rotationX;
      temp.position.x = newX;
      temp.position.y = newY;
      temp.position.z = newZ;
      positions.push({ x: newX, y: newY });
    } else {
      console.log("Position too close, adjusting or skipping...");
      // change the position to another random position and check for position close until not close anymore  
      let tempX = adjustment.positionX - (Math.random() * (i / 12));
      let tempY = adjustment.positionY + (Math.random() * (i / 12));
      console.log(`Generated tempX BEFORE : ${tempX}, tempY  BEFORE : ${tempY}`); // Log tempX and tempY
      while (isPositionClose(tempX, tempY, 0.04)) {
        tempX = adjustment.positionX - (Math.random() * (i / 10));
        tempY = adjustment.positionY + (Math.random() * (i / 10));
        console.log(`Generated tempX: ${tempX}, tempY: ${tempY}`); // Log tempX and tempY
      }
      const temp = new THREE.Mesh(geometry, material);
      scene.add(temp);
      temp.rotation.x = adjustment.rotationX;
      temp.position.x = tempX;
      temp.position.y = tempY;
      temp.position.z = newZ;
      positions.push({ x: tempX, y: tempY });
    }
  }
});

// Create an animation loop
function animate() {
  requestAnimationFrame(animate);

  camera.position.z -= 0.1;

  renderer.render(scene, camera);
}

animate();