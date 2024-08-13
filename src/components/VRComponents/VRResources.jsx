import * as THREE from 'three';


export class VRResources {
  constructor(scene) {

    const buttonGeometry = new THREE.BoxGeometry(.01, .01, .01);
    const interMaterial = new THREE.MeshStandardMaterial({ color: 0x00000 });


    // Button 1 for VR page
    this.button1Interactor = new THREE.Mesh(buttonGeometry, interMaterial);
    this.button1Interactor.position.set(-.1,1.45,-.2);
    this.button1Interactor.rotateX(Math.PI/2+.4);
    scene.add(this.button1Interactor);

    // Button 2 for VR page
    this.button2Interactor = new THREE.Mesh(buttonGeometry, interMaterial);
    this.button2Interactor.position.set(-.05,1.45,-.2);
    this.button2Interactor.rotateX(Math.PI/2+.4);
    scene.add(this.button2Interactor);

    // Button 3 for VR page
    this.button3Interactor = new THREE.Mesh(buttonGeometry, interMaterial);
    this.button3Interactor.position.set(.05,1.45,-.2);
    this.button3Interactor.rotateX(Math.PI/2+.4);
    scene.add(this.button3Interactor);

    // Button 4 for VR page
    this.button4Interactor = new THREE.Mesh(buttonGeometry, interMaterial);
    this.button4Interactor.position.set(.1,1.45,-.2);
    this.button4Interactor.rotateX(Math.PI/2+.4);
    scene.add(this.button4Interactor);
  }

    getVRButton1Interactor() {
    return this.button1Interactor;
    }
    getVRButton2Interactor() {
    return this.button2Interactor;
    }
    getVRButton3Interactor() {
    return this.button3Interactor;
    }
    getVRButton4Interactor() {
    return this.button4Interactor;
    } 
}