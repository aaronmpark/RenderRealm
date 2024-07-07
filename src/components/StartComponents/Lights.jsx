import * as THREE from 'three';

export class Lights {
  constructor(scene) {
    this.spotLight = new THREE.SpotLight(0xffffff, 3000, 100, 0.22, 1);
    this.spotLight.position.set(0, 25, 0);
    this.spotLight.castShadow = true;
    this.spotLight.shadow.bias = -0.0001;
    scene.add(this.spotLight);

    this.lanternLight = new THREE.PointLight(0xfffffff, 50, 9);
    this.lanternLight.position.set(0, 4, 0);
    scene.add(this.lanternLight);

    this.screenLight = new THREE.PointLight(0xffffff, 20, 1);
    this.screenLight.position.set(-.2, 1.9, 0);
    this.screenLight.visible = false;
    scene.add(this.screenLight);
  }

  getSpotLight() {
    return this.spotLight;
  }

  getLanternLight() {
    return this.lanternLight;
  }

  getScreenLight() {
    return this.screenLight;
  }
}