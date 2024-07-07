// src/pages/start.js
import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Audio, AudioListener, AudioLoader } from 'three';

export function Start({ setZoomed }) {
  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(2, 6, 10);
    camera.lookAt(0, 0, 0);

    // TODO:
    // fix this at some point later because its not working breh -> audio leaks onto the next page... look into it 
    // // Room Audio
    // const listener = new AudioListener();
    // camera.add(listener);
    // const sound = new Audio(listener);
    // const audioLoader = new AudioLoader();
    // audioLoader.load('public/audio/room.mp3', function(buffer) {
    //   sound.setBuffer(buffer);
    //   sound.setLoop(false);
    //   sound.setVolume(0.1);
    //   sound.play();
    // });

    // const listener2 = new AudioListener();
    // camera.add(listener2);
    // const sound2 = new Audio(listener2);
    // const audioLoader2 = new AudioLoader();
    // audioLoader2.load('public/audio/light.mp3', function(buffer) {
    //   sound2.setBuffer(buffer);
    //   sound2.setLoop(false);
    //   sound2.setVolume(0.1);
    //   sound2.play();
    // });

    // Raycaster and mouse vector
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let clickableClicked = false;
    let buttonPressed = false;

    // Ground materials
    const groundGeo = new THREE.PlaneGeometry(20, 20, 32, 32);
    groundGeo.rotateX(-Math.PI / 2);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x555555,
      side: THREE.DoubleSide
    });

    // Ground Mesh
    const groundMesh = new THREE.Mesh(groundGeo, groundMaterial);
    groundMesh.castShadow = false;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // Spotlight
    const spotLight = new THREE.SpotLight(0xffffff, 3000, 100, 0.22, 1);
    spotLight.position.set(0, 25, 0);
    spotLight.castShadow = true;
    spotLight.shadow.bias = -0.0001;
    scene.add(spotLight);

    // Loaders for the GLB files
    const loader = new GLTFLoader().setPath('public/models/');

    let desk;
    loader.load('StandingDesk.glb', (glb) => {
      desk = glb.scene;
      desk.position.set(0, .55, 0);
      desk.scale.set(2, 1.5, 2.5);

      desk.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      scene.add(desk);
    });

    let comp;
    loader.load('CompDesk.glb', (glb) => {
      comp = glb.scene;
      comp.position.set(-.2, 1.4, 0);
      comp.scale.set(.003, .003, .003);
      comp.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      scene.add(comp);
    });

    loader.load('HangingLantern.glb', (glb) => {
      const mesh = glb.scene;
      mesh.position.set(0, 7, 0);
      scene.add(mesh);
    });

    loader.load('chain.glb', (glb) => {
      const mesh = glb.scene;
      mesh.position.set(0, 9.5, 0);
      mesh.scale.set(1.75, 5, 1.75);
      scene.add(mesh);
    });

    let monitor;
    loader.load('monitorScreen.glb', (glb) => {
      monitor = glb.scene;
      monitor.position.set(-.418, 1.167, .44);
      monitor.scale.set(.985, .85, 1);
      monitor.visible = false;
      scene.add(monitor);
    });

    // Light for the Lantern
    const lanternLight = new THREE.PointLight(0xfffffff, 50, 9);
    lanternLight.position.set(0, 4, 0);
    scene.add(lanternLight);

    // Screen in the middle of Monitor
    const interGeometry = new THREE.BoxGeometry(1.1, .7, .02);
    const interMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const interactor = new THREE.Mesh(interGeometry, interMaterial);
    interactor.position.set(-.2, 1.9, 0);
    interactor.castShadow = false;
    interactor.receiveShadow = false;
    interactor.visible = false;
    scene.add(interactor);

    // start Button for the Monitor
    const buttonGeometry = new THREE.BoxGeometry(1.1, .7, .02);
    const button = new THREE.Mesh(buttonGeometry, interMaterial);
    button.position.set(-.2, 1.9, 0);
    button.visible = false;
    scene.add(button);

    // Light for the Monitor when it is zoomed in on
    const screenLight = new THREE.PointLight(0xffffff, 20, 1);
    screenLight.position.set(-.2, 1.9, 0);
    screenLight.visible = false;
    scene.add(screenLight);

    // Controls so you can move around the page
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 5;
    controls.maxDistance = 20;
    controls.minPolarAngle = 0.5;
    controls.maxPolarAngle = 1.5;
    controls.autoRotate = false;
    controls.target = new THREE.Vector3(0, 1.75, 0);

    function wait(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Event listener for mouse click
    function onMouseClick(event) {
      event.preventDefault();

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects([interactor]);

      if (intersects.length > 0 && !clickableClicked && (camera.position.z > 2.8)) {
        clickableClicked = true;
        console.log('Clickable object clicked!', clickableClicked);
      }
    }
    window.addEventListener('click', onMouseClick, false);

    let zoomed;
    async function zoomScreen() {
      await wait(500);
      monitor.visible = true;
      screenLight.visible = true;
      await wait(1000);
      camera.position.z -= .08;
      await wait(150);
      comp.visible = false;
      desk.visible = false;
      renderer.setClearColor(0xffffff);
      groundMesh.visible = false;
      await wait(200);
      setZoomed(true); // Update the shared state
    }

    function adjustScreen() {
      controls.enabled = false;
      if (camera.position.z > 2.8) {
        camera.position.z -= 0.05;
      }
      if (camera.position.y > 1.9) {
        camera.position.y -= 0.05;
      }
      if (camera.position.x > -.2) {
        camera.position.x -= 0.05;
      }
      if (camera.position.x < -.2) {
        camera.position.x += 0.05;
      }

      camera.lookAt(-.2, 1.9, 0);
    }

    function checkPosition() {
      const targetPosition = new THREE.Vector3(-.2, 1.9, 2.8);
      const tolerance = 0.05;
      if (clickableClicked && (Math.abs(camera.position.x - targetPosition.x) < tolerance &&
        Math.abs(camera.position.y - targetPosition.y) < tolerance &&
        Math.abs(camera.position.z - targetPosition.z) < tolerance)) {
        console.log("Camera at Position!");
        buttonPressed = true;
      }
    }

    async function changeLight() {
      const randomIntensity = Math.random() * 8000;
      if (randomIntensity > 30 && randomIntensity < 75) {
        lanternLight.intensity = randomIntensity;
        spotLight.intensity = randomIntensity;
        await wait(100);
        spotLight.intensity = 3000;
        spotLight.visible = true;
      }
    }

    function animate() {
      requestAnimationFrame(animate);

      if (!buttonPressed) {
        checkPosition();
      }

      if (!clickableClicked) {
        changeLight();
      }

      if (buttonPressed) {
        zoomScreen();
      }
      else if (clickableClicked && !buttonPressed) {
        adjustScreen();
        console.log("ADJUSTING");
      }
      else {
        controls.update();
      }
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      window.removeEventListener('click', onMouseClick);
      document.body.removeChild(renderer.domElement);
    };
  }, [setZoomed]);

  return <div id="three-container"></div>;
}