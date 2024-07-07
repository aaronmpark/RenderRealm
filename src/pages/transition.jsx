import React, { useEffect } from 'react';
import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { Renderer } from '../components/StartComponents/Renderer';
import { Scene } from '../components/StartComponents/Scene';
import { Camera } from '../components/StartComponents/Camera';

export function Transition({ setTransitioned }){
  useEffect(() => {
  VRButton.createButton();

  const scene = new Scene().getScene();
  const renderer = new Renderer().getRenderer();
  renderer.setClearColor(0xffffff); //turns the background white
  const camera = new Camera().getCamera();
  camera.position.z = 30;

  const geometry = new THREE.CylinderGeometry(0.03, 0.03, 2, 64, 1, false);
  const positions = [];
  const rainbowColors = [
    0xFF0000, // Red
    0xFF7F00, // Orange
    0xFFFF00, // Yellow
    0x00FF00, // Green
    0x0000FF, // Blue
    0x4B0082, // Indigo
    0x9400D3  // Violet
  ];
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
  
  function isPositionClose(newX, newY, threshold) {
    for (let pos of positions) {
      let d = Math.sqrt((pos.x - newX) ** 2 + (pos.y - newY) ** 2);
      if (d < threshold) {
        return true; 
      }
    }
    return false; 
  }
  
  function isMiddle(newX, newY, threshold) {
      let d = Math.sqrt((newX - 0) ** 2 + (newY - 0) ** 2);
      if (d < threshold) {
        return true; 
      }
    return false; 
  }

  const adjustments = [
    { rotationX: 3.14 / 2, positionX: 0.3, positionY: 0.2 },
    { rotationX: -3.14 / 2, positionX: -0.3, positionY: 0.2 },
    { rotationX: -3.14 / 2, positionX: -0.3, positionY: -0.2 },
    { rotationX: 3.14 / 2, positionX: 0.3, positionY: -0.2 },
    { rotationX: 3.14 / 2, positionX: 0, positionY: .2 },
    { rotationX: -3.14 / 2, positionX: 0, positionY: -.2 }
  ];
  
  adjustments.forEach(adjustment => {
    for (let i = 0; i < 50; i++) {
      let newX = 0;
      let newY = 0;
      let check = Math.random();
      let newZ = 0.0;
  
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
  
  
      if (newX == 0 || newY == 0 || isMiddle(newX, newY, 0.18)){
        continue;
      }
  
      if (!isPositionClose(newX, newY, 0.062)) {
        const color = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
        const material = new THREE.MeshBasicMaterial({ color: color, wireframe: false });
        const temp = new THREE.Mesh(geometry, material);
        scene.add(temp);
        temp.rotation.x = adjustment.rotationX;
        temp.position.x = newX;
        temp.position.y = newY;
        temp.position.z = newZ;
        positions.push({ x: newX, y: newY });
        continue; // just in case lol
      } 
      
      // if they are too close, then we need to adjust their values!
      else {
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
            break;
          }
        }
  
        if (isMiddle(newX, newY, 0.18)){
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
        positions.push({ x: newX, y: newY });
      }
    }
  });
  
  function checkPosition(){
    if (camera.position.z < -17){
      setTransitioned(true);
    }
  }

  function animate() {
    requestAnimationFrame(animate);
  
    checkPosition();
    camera.position.z -= 0.1;
  
    renderer.render(scene, camera);
  }
  
  animate();
}, [setTransitioned]);
}
