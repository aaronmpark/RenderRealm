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
    camera.position.set(0, 0, 0);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    
    const controls = new Controls(camera, renderer).getControls();
    controls.target = new THREE.Vector3(0.5, 2, 0.5);
    controls.minDistance = 0;
    controls.maxDistance = 5;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI;

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
    const smallerGrid = new THREE.GridHelper(100,200, 0xc7c7c7, 0xbdbdbd);

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
fix the cleanup functions -> maybe turn into another component
add audio to the pages -> later
maybe make it so that once u are on the actual portfolio page -> when u refresh, it refreshes to the portfolio page?
^^^ can do so by IMO making this page into ANOTHER deployed app -> the actual app, as in the first two would just lead it to another "sub-domain" being this one, which only got this
^^^ also emphasizes that "new reality concept"

create the design of this portfolio page
like in VR when u connect to ur computer
has the shape of the jaunts
has like checkered white bottom and top
pops up the monitor
make sure everything is optimized

*/

