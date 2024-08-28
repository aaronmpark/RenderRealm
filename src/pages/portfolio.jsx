import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Renderer } from '../components/StartComponents/Renderer';
import { Scene } from '../components/StartComponents/Scene';
import { Camera } from '../components/StartComponents/Camera';
import { Controls } from '../components/StartComponents/Controls';
import { VRResources } from '../components/VRComponents/VRResources';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

export function Portfolio() {
  console.log("on portfolio");

  const scene = new Scene().getScene();
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xc7c7c7);
  document.body.appendChild(renderer.domElement);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const camera = new Camera().getCamera();

  // Look at this later -> will change later ? (light so that colors can exist)
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);


  // Camera position
  camera.position.set(0, 1.5, 0);
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // Movement Control settings
  const controls = new Controls(camera, renderer).getControls();
  controls.target = new THREE.Vector3(0, 1.5, 0);
  controls.minDistance = 0;
  controls.maxDistance = 0.00001;
  controls.minPolarAngle = 0;
  controls.maxPolarAngle = Math.PI + 2.5;

  // Ground materials
  const groundGeo = new THREE.PlaneGeometry(200, 200, 32, 32);
  groundGeo.rotateX(-Math.PI / 2);
  const groundMaterial = new THREE.MeshBasicMaterial({
    color: 0xc7c7c7,
    side: THREE.DoubleSide,
  });

  // Ground Mesh
  const groundMesh = new THREE.Mesh(groundGeo, groundMaterial);
  scene.add(groundMesh);

  // GRIDS -> turn into another component for organization later
  const bigGrid = new THREE.GridHelper(200, 25, 0x898788, 0x000000);
  const smallerGrid = new THREE.GridHelper(200, 200, 0xadadad, 0xadadad);

  bigGrid.position.y = 0.001;


  const ceilingBigGrid = bigGrid.clone();
  const ceilingSmallGrid = smallerGrid.clone();

  scene.add(ceilingBigGrid);
  scene.add(ceilingSmallGrid);
  scene.add(bigGrid);
  scene.add(smallerGrid);

  ceilingBigGrid.position.y = 14.999;
  ceilingSmallGrid.position.y = 15;

  const ceilingMaterial = new THREE.MeshBasicMaterial({
    color: 0xc7c7c7,
    side: THREE.DoubleSide,
  });

  const ceilingMesh = new THREE.Mesh(groundGeo, ceilingMaterial);
  scene.add(ceilingMesh);
  ceilingMesh.position.y = 15;

  //CODE FOR INITIAL TASKBAR pt 1
  // [import a taskbar thing i can create model with certain things]
  // 4 buttons that will call 4 different functions

  const vrResources = new VRResources(scene);

  // 4 button INTERACTORS (so that when u press on them, different functions are called)
  const button1Interactor = vrResources.getVRButton1Interactor();
  const button2Interactor = vrResources.getVRButton2Interactor();
  const button3Interactor = vrResources.getVRButton3Interactor();
  const button4Interactor = vrResources.getVRButton4Interactor();

  const panel = vrResources.getPanel();

  const app1 = vrResources.getApp1();
  const app2 = vrResources.getApp2();

  app1.visible = false;
  app2.visible = false;

  const onMouseClick = (event) => {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const b1Intersects = raycaster.intersectObjects([button1Interactor]);
    const b2Intersects = raycaster.intersectObjects([button2Interactor]);
    const b3Intersects = raycaster.intersectObjects([button3Interactor]);
    const b4Intersects = raycaster.intersectObjects([button4Interactor]);
    const app1Intersects = raycaster.intersectObjects([app1]);
    const app2Intersects = raycaster.intersectObjects([app2]);


    if (b1Intersects.length > 0) {
      resetPage();
      console.log('Resetting!');
    }
    if (b2Intersects.length > 0) {
      openPanel();
      console.log('Opening Control Panel');
    }
    if (b3Intersects.length > 0) {
      openSettings();
      console.log('Settings');
    }
    if (b4Intersects.length > 0) {
      moveSite();
      console.log('Moving to other site...');
    }

    if (app1Intersects.length > 0 && panel.visible == true) {
      openPortfolio();
      console.log("Opening portfolio...");
    }
    if (app2Intersects.length > 0 && panel.visible == true) {
      generateGame();
      console.log("Generating Game...");
    }
  };

  const resetPage = () => {
    // do stuff [implement last cuz needs the other stuff to be made first]
  }

  const openPanel = () => {
    if (panel.visible == false) {
      panel.visible = true;
      app1.visible = true;
      app2.visible = true;
    }
    else {
      panel.visible = false;
      app1.visible = false;
      app2.visible = false;
    }
    console.log("PANEL IS OPEN");
  }

  const openSettings = () => {
    // create settings menu (or just call it from a diff component is what i mean)
  }

  const moveSite = () => {
    // move to other site - create the site that this will go to (last thing?)
    window.open("https://www.google.com", "_blank")
  }

  const openPortfolio = () => {
    // Open another thing that will just open a website on the page?
  }

  const generateGame = () => {
    // generate some sort of game within the world idk
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('click', onMouseClick, false);


  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);

  }



  animate();

  return <div />;
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

maybe remove the top ceiling one (experiment later)

the embed moves weird with the camera
^^^ try to figure out how it can work with the controls but idk if it can
bcus its kinda like its a static embed image that exists, but the camera controls updates the page perma.
so it kinda just stays in the middle cuz its like just website in the middle
so idk how it can move too

*/

