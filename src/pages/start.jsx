// src/pages/start.js
import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Renderer } from '../components/StartComponents/Renderer';
import { Scene } from '../components/StartComponents/Scene';
import { Camera } from '../components/StartComponents/Camera';
import { Lights } from '../components/StartComponents/Lights';
import { Controls } from '../components/StartComponents/Controls';
import { Resources } from '../components/StartComponents/Resources';

export function Start({ setZoomed }) {
  useEffect(() => {
    const renderer = new Renderer().getRenderer();
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new Scene().getScene();
    const camera = new Camera().getCamera();

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let neutral = false;
    let onMonitor = false;

    const lights = new Lights(scene);
    const controls = new Controls(camera, renderer).getControls();
    const resources = new Resources(scene);

    const spotLight = lights.getSpotLight();
    const lanternLight = lights.getLanternLight();
    const screenLight = lights.getScreenLight();
    const groundMesh = resources.getGround();
    const interactor = resources.getInteractor();

    const loader = new GLTFLoader().setPath('src/assets/models/');
    let desk, comp, monitor;

    const loadModels = () => {
      loader.load('StandingDesk.glb', (glb) => {
        desk = glb.scene;
        desk.position.set(0, 0.55, 0);
        desk.scale.set(2, 1.5, 2.5);
        desk.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        scene.add(desk);
      });

      loader.load('CompDesk.glb', (glb) => {
        comp = glb.scene;
        comp.position.set(-0.2, 1.4, 0);
        comp.scale.set(0.003, 0.003, 0.003);
        comp.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        scene.add(comp);
      });

      loader.load('HangingLantern.glb', (glb) => {
        const lantern = glb.scene;
        lantern.position.set(0, 7, 0);
        scene.add(lantern);
      });

      loader.load('chain.glb', (glb) => {
        const chain = glb.scene;
        chain.position.set(0, 9.5, 0);
        chain.scale.set(1.75, 5, 1.75);
        scene.add(chain);
      });

      loader.load('monitorScreen.glb', (glb) => {
        monitor = glb.scene;
        monitor.position.set(-0.418, 1.167, 0.44);
        monitor.scale.set(0.985, 0.85, 1);
        monitor.visible = false;
        scene.add(monitor);
      });
    };

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const onMouseClick = (event) => {
      event.preventDefault();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([interactor]);
      if (intersects.length > 0 && !neutral && camera.position.z > 2.8) {
        neutral = true;
        //console.log('Clickable object clicked!', clickableClicked);
      }
    };

    const zoomScreen = async () => {
      await wait(500);
      monitor.visible = true;
      screenLight.visible = true;
      await wait(1000);
      camera.position.z -= 0.08;
      await wait(150);
      comp.visible = false;
      desk.visible = false;
      renderer.setClearColor(0xffffff);
      groundMesh.visible = false;
      await wait(200);
      setZoomed(true);
    };

    const adjustScreen = () => {
      controls.enabled = false;
      if (camera.position.z > 2.8) camera.position.z -= 0.05;
      if (camera.position.y > 1.9) camera.position.y -= 0.05;
      if (camera.position.x > -0.2) camera.position.x -= 0.05;
      if (camera.position.x < -0.2) camera.position.x += 0.05;
      camera.lookAt(-0.2, 1.9, 0);
    };

    const checkPosition = () => {
      const targetPosition = new THREE.Vector3(-0.2, 1.9, 2.8);
      const tolerance = 0.05;
      if (neutral && Math.abs(camera.position.x - targetPosition.x) < tolerance &&
        Math.abs(camera.position.y - targetPosition.y) < tolerance &&
        Math.abs(camera.position.z - targetPosition.z) < tolerance) {
        //console.log("Camera at Position!");
        onMonitor = true;
      }
    };

    const changeLight = async () => {
      const randomIntensity = Math.random() * 8000;
      if (randomIntensity > 30 && randomIntensity < 75) {
        lanternLight.intensity = randomIntensity;
        spotLight.intensity = randomIntensity;
        await wait(100);
        spotLight.intensity = 3000;
        spotLight.visible = true;
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      if (!onMonitor) checkPosition();
      if (!neutral) changeLight();
      if (onMonitor) zoomScreen();
      else if (neutral && !onMonitor) adjustScreen();
      else controls.update();
      renderer.render(scene, camera);
    };

    loadModels();
    window.addEventListener('click', onMouseClick, false);
    animate();

    return () => {
      window.removeEventListener('click', onMouseClick);
      document.body.removeChild(renderer.domElement);
    };
  }, [setZoomed]);

  return null;
}