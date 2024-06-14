import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';

VRButton.createButton();
const scene = new THREE.Scene(); // creates the scene (NEEDED think like just scene that u will switch on to.)

const renderer = new THREE.WebGLRenderer(); // how it renders onto the  screen
renderer.setSize(window.innerWidth, window.innerHeight); // sets the size of the render/
renderer.setClearColor(0x000000, 1); //turns the background white
document.body.appendChild(renderer.domElement); // how the thing actually renders it i think ?

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Materials
//const material = new THREE.MeshBasicMaterial({ color: 0x00fff00, wireframe: false }); // green sides

// Geometry
// 3rd one is height
const geometry = new THREE.CylinderGeometry(0.03, 0.03, 2, 64, 1, false);

const rainbowColors = [
  0xFF0000, // Red
  0xFF7F00, // Orange
  0xFFFF00, // Yellow
  0x00FF00, // Green
  0x0000FF, // Blue
  0x4B0082, // Indigo
  0x9400D3  // Violet
];


// add more and change the heights/positionZ mainly
const initial = [
  { rotationX: 3.14 / 2, positionX: 0.22, positionY: 0.21, positionZ: 10 },
  { rotationX: -3.14 / 2, positionX: -0.2, positionY: 0.204, positionZ: 15 },
  { rotationX: -3.14 / 2, positionX: -0.23, positionY: -0.2, positionZ: 6 },
  { rotationX: 3.14 / 2, positionX: 0.21, positionY: -0.2, positionZ: 13 },
  { rotationX: 3.14 / 2, positionX: 0, positionY: .221, positionZ: 14 },
  { rotationX: -3.14 / 2, positionX: 0, positionY: -.2045, positionZ: 4 },
  { rotationX: -3.14 / 2, positionX: -0.2, positionY: -.22, positionZ: 7 },
  { rotationX: -3.14 / 2, positionX: 0.21, positionY: -.11, positionZ: 9 },
  { rotationX: -3.14 / 2, positionX: -0.24, positionY: -.18, positionZ: 11 },
  { rotationX: -3.14 / 2, positionX: 0.23, positionY: -.18, positionZ: 2 },
  { rotationX: -3.14 / 2, positionX: -0.211, positionY: -.23, positionZ: 3 }
];

// create the initial cylinders towards the beginning of the session
initial.forEach(initials => {
  const color = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
  const material = new THREE.MeshBasicMaterial({ color: color, wireframe: false });
  const cylinder = new THREE.Mesh(geometry, material);
  scene.add(cylinder);
  cylinder.rotation.x = initials.rotationX;
  cylinder.position.x = initials.positionX;
  cylinder.position.y = initials.positionY;
  cylinder.position.z = initials.positionZ;
});
camera.position.z = 23;


const positions = [];

function isPositionClose(newX, newY, threshold) {
  for (let pos of positions) {
    let d = Math.sqrt((pos.x - newX) ** 2 + (pos.y - newY) ** 2);
    // console.log(`Generated Distance: ${d}`); // Log newX and newY
    // console.log(`Generated threshold: ${threshold}`); // Log newX and newY
    if (d < threshold) {
      return true; // Position is too close to an existing one
    }
  }
  return false; // Position is fine
}

function isMiddle(newX, newY, threshold) {
    let d = Math.sqrt((newX - 0) ** 2 + (newY - 0) ** 2);
    if (d < threshold) {
      return true; // Position is too close to an existing one
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


// adjust this so that its more like LESS EARLY, MORE LATER.
// i thinkr n its ok but tweak it later?
adjustments.forEach(adjustment => {
  for (let i = 0; i < 50; i++) {
    // fine tune the numbers later because lowkey want it to be closer to the middle a little bit
    let newX = 0;
    let newY = 0;
    let check = Math.random();
    let newZ = 0.0;

    // randomly decides if the position of the new values will be positive or negative
    if (check <= 0.4){
      newZ = -5 + (Math.random() * 5);

    }
    else{
      newZ = -5 - (Math.random() * 5);

    }
    
    if (adjustment.positionX < 0){
      newX = adjustment.positionX + (Math.random() * (i / 65));
    }
    else{
      newX = adjustment.positionX - (Math.random() * (i / 65));
    }  
    if (adjustment.positionY < 0){
      newY = adjustment.positionY + (Math.random() * (i / 65));
    }
    else{
      newY = adjustment.positionY - (Math.random() * (i / 65));
    }  

    // console.log(`Generated newX: ${newX}, newY: ${newY}`); // Log newX and newY

    // doesn't spawn in the middle (fine tune the numbers later)
    if (newX == 0 || newY == 0){
      console.log("zero");
      continue;
    }

    // write a better not spawn in middle code here
    if (isMiddle(newX, newY, 0.18)){
      console.log("MIDDLE");
      console.log(`Generated MIDDLE : ${newX}, tempY  : ${newY}`); // Log tempX and tempY
      continue;
    }

    // if arent close to each other by diameter length (0.062 with margin of error) -> adds the jauntson
    if (!isPositionClose(newX, newY, 0.062)) {
      const color = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
      const material = new THREE.MeshBasicMaterial({ color: color, wireframe: false });
      const temp = new THREE.Mesh(geometry, material);
      scene.add(temp);
      temp.rotation.x = adjustment.rotationX;
      temp.position.x = newX;
      temp.position.y = newY;
      temp.position.z = newZ;
      console.log("normal situation");
      positions.push({ x: newX, y: newY });
      continue; // just in case lol
    } 
    
    // if they are too close, then we need to adjust their values!
    else {
      // console.log(`Generated tempX BEFORE : ${newX}, tempY  BEFORE : ${newY}`); // Log tempX and tempY

      // change their values by a different Math.random() value for each moment of it being close...

      // just gonna randomize it again until it is no longer close i think (?)

      let attempts = 0;
      const maxAttempts = 10;
      while (isPositionClose(newX, newY, 0.062) && attempts < maxAttempts) {
        if (adjustment.positionX < 0){
          newX = adjustment.positionX + (Math.random() * (i / 65));
        }
        else{
          newX = adjustment.positionX - (Math.random() * (i / 65));
        }  
        if (adjustment.positionY < 0){
          newY = adjustment.positionY + (Math.random() * (i / 65));
        }
        else{
          newY = adjustment.positionY - (Math.random() * (i / 65));
        }  
        attempts++;
        if (attempts >= maxAttempts) {
          console.log("Could not find a suitable position");
          break;
        }
      }

      if (isMiddle(newX, newY, 0.18)){
        console.log("MIDDLE");
        console.log(`Generated MIDDLE : ${newX}, tempY  : ${newY}`); // Log tempX and tempY
        continue;
      }
      const color = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
      const material = new THREE.MeshBasicMaterial({ color: color, wireframe: false });
      const temp = new THREE.Mesh(geometry, material);
      scene.add(temp);
      temp.rotation.x = adjustment.rotationX;
      temp.position.x = newX;
      temp.position.y = newY;
      temp.position.z = newZ;
      // console.log("worked!");
      positions.push({ x: newX, y: newY });
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