import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';
export class Controls {
  constructor(camera, renderer) {
    this.controls = new OrbitControls(camera, renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 20;
    this.controls.minPolarAngle = 0.5;
    this.controls.maxPolarAngle = 1.5;
    this.controls.autoRotate = false;
    this.controls.target = new THREE.Vector3(0, 1.75, 0);
  }

  getControls() {
    return this.controls;
  }
}