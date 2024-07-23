import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Renderer } from '../components/StartComponents/Renderer';
import { Scene } from '../components/StartComponents/Scene';
import { Camera } from '../components/StartComponents/Camera';
import { Controls } from '../components/StartComponents/Controls';

export function Portfolio() {
    console.log("on portfolio");
    
    const scene = new Scene().getScene();
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x8b8b8b);
    document.body.appendChild(renderer.domElement);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const camera = new Camera().getCamera();

    // Camera position
    camera.position.set(0, 1.5, 0);
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    
    const controls = new Controls(camera, renderer).getControls();
    controls.target = new THREE.Vector3(0, 1.5, 0);
    controls.minDistance = 0;
    controls.maxDistance = 0.00001;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI+2.5;


    // Ground materials
    const groundGeo = new THREE.PlaneGeometry(100, 100, 32, 32);
    groundGeo.rotateX(-Math.PI / 2);
    const groundMaterial = new THREE.MeshBasicMaterial({
      color: 0xc7c7c7,
      side: THREE.DoubleSide,
    });

    // Ground Mesh
    const groundMesh = new THREE.Mesh(groundGeo, groundMaterial);
    scene.add(groundMesh);

    //grids
    const bigGrid = new THREE.GridHelper(100,25, 0x898788, 0x000000);
    const smallerGrid = new THREE.GridHelper(100,200, 0xadadad, 0xadadad);

    bigGrid.position.y = 0.001;


    const ceilingBigGrid = bigGrid.clone();
    const ceilingSmallGrid = smallerGrid.clone();

    scene.add(ceilingBigGrid);
    scene.add(ceilingSmallGrid);
    scene.add(bigGrid);
    scene.add(smallerGrid);

    ceilingBigGrid.position.y = 6.999;
    ceilingSmallGrid.position.y = 7;

    const ceilingMaterial = new THREE.MeshBasicMaterial({
      color: 0xc7c7c7,
      side: THREE.DoubleSide,
    });

    const ceilingMesh = new THREE.Mesh(groundGeo, ceilingMaterial);
    scene.add(ceilingMesh);
    ceilingMesh.position.y = 7;

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onWindowResize, false);

    // use for debugging

  //   function onMouseMove(event) {
  //     // Normalize mouse coordinates
  //     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  //     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  //     // Update the raycaster with the camera and mouse position
  //     raycaster.setFromCamera(mouse, camera);

  //     // Calculate objects intersecting the ray
  //     const intersects = raycaster.intersectObjects(scene.children, true);

  //     if (intersects.length > 0) {
  //         const intersect = intersects[0];
  //         console.log(`Intersection at: ${intersect.point.x}, ${intersect.point.y}, ${intersect.point.z}`);
  //         // Optionally, display the coordinates in the UI
  //         // document.getElementById('coordinates').innerText = `X: ${intersect.point.x}, Y: ${intersect.point.y}, Z: ${intersect.point.z}`;
  //     }
  // }

  // window.addEventListener('mousemove', onMouseMove, false);

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }



    animate();
    
  return <div/>;
}




/*
TODO:
add audio to the pages -> later
maybe make it so that once u are on the actual portfolio page -> when u refresh, it refreshes to the portfolio page -> set the default to portfolio after somehow? idk about that tbh
^^^ can do so by IMO making this page into ANOTHER deployed app -> the actual app, as in the first two would just lead it to another "sub-domain" being this one, which only got this
^^^ also emphasizes that "new reality concept"

create the design of this portfolio page
like in VR when u connect to ur computer
has the shape of the jaunts
has like checkered white bottom and top
pops up the monitor
make sure everything is optimized


add in the vr screen thing
change the weird glitching in and out somehow
*/

