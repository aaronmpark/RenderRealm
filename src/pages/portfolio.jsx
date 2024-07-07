import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Renderer } from '../components/StartComponents/Renderer';
import { Scene } from '../components/StartComponents/Scene';
import { Camera } from '../components/StartComponents/Camera';

export function Portfolio() {
  const mountRef = useRef(null);

  useEffect(() => {
    console.log("on portfolio");

    const scene = new Scene().getScene();
    const renderer = new Renderer().getRenderer();
    const camera = new Camera().getCamera();

    // Camera position
    camera.position.set(0, 0, 5);

    // Ground materials
    const groundGeo = new THREE.PlaneGeometry(20, 20, 32, 32);
    groundGeo.rotateX(-Math.PI / 2);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });

    // Ground Mesh
    const groundMesh = new THREE.Mesh(groundGeo, groundMaterial);
    scene.add(groundMesh);

    // Add renderer to DOM
    mountRef.current.appendChild(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    // Cleanup function
    return () => {
      // Dispose of geometries, materials, and textures
      scene.traverse((object) => {
        if (object.isMesh) {
          object.geometry.dispose();
          if (object.material.isMaterial) {
            cleanMaterial(object.material);
          } else {
            // If it's an array of materials
            for (const material of object.material) cleanMaterial(material);
          }
        }
      });

      // Clean up renderer
      renderer.dispose();

      // Remove renderer's DOM element
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  function cleanMaterial(material) {
    material.dispose();

    // Dispose of textures
    for (const key in material) {
      const value = material[key];
      if (value && typeof value === 'object' && 'minFilter' in value) {
        value.dispose();
      }
    }
  }

  return <div ref={mountRef} />;
}