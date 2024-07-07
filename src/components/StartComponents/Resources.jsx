import * as THREE from 'three';


export class Resources {
  constructor(scene) {

    // Ground materials
    const groundGeo = new THREE.PlaneGeometry(20, 20, 32, 32);
    groundGeo.rotateX(-Math.PI / 2);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x555555,
      side: THREE.DoubleSide
    });

    // Ground Mesh
    this.groundMesh = new THREE.Mesh(groundGeo, groundMaterial);
    this.groundMesh.castShadow = false;
    this.groundMesh.receiveShadow = true;
    scene.add(this.groundMesh);

    // Screen in the middle of Monitor
    const interGeometry = new THREE.BoxGeometry(1.1, .7, .02);
    const interMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    this.interactor = new THREE.Mesh(interGeometry, interMaterial);
    this.interactor.position.set(-.2, 1.9, 0);
    this.interactor.castShadow = false;
    this.interactor.receiveShadow = false;
    this.interactor.visible = false;
    scene.add(this.interactor);

    // start Button for the Monitor
    const buttonGeometry = new THREE.BoxGeometry(1.1, .7, .02);
    this.button = new THREE.Mesh(buttonGeometry, interMaterial);
    this.button.position.set(-.2, 1.9, 0);
    this.button.visible = false;
    scene.add(this.button);
  }
  

    getGround() {
      return this.groundMesh;
    }

    getInteractor() {
      return this.interactor;
    }

    getButton() {
      return this.button;
    }
}