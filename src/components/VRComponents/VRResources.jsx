import * as THREE from 'three';


export class VRResources {
  constructor(scene) {

    const buttonGeometry = new THREE.BoxGeometry(.01, .01, .01);
    const interMaterial = new THREE.MeshStandardMaterial({ color: 0x00000 });

    const panelGeometry = new THREE.BoxGeometry(.07, .01, .05);

    const appMaterial = new THREE.MeshStandardMaterial({ color: 0x00FF00 });

    const appGeometry = new THREE.BoxGeometry(.05, .005, .05);

    // Button 1 for VR page
    this.button1Interactor = new THREE.Mesh(buttonGeometry, interMaterial);
    this.button1Interactor.position.set(-.1, 1.45, -.2);
    this.button1Interactor.rotateX(Math.PI / 2 + .4);
    scene.add(this.button1Interactor);

    // Button 2 for VR page
    this.button2Interactor = new THREE.Mesh(buttonGeometry, interMaterial);
    this.button2Interactor.position.set(-.05, 1.45, -.2);
    this.button2Interactor.rotateX(Math.PI / 2 + .4);
    scene.add(this.button2Interactor);

    // Button 3 for VR page
    this.button3Interactor = new THREE.Mesh(buttonGeometry, interMaterial);
    this.button3Interactor.position.set(.05, 1.45, -.2);
    this.button3Interactor.rotateX(Math.PI / 2 + .4);
    scene.add(this.button3Interactor);

    // Button 4 for VR page
    this.button4Interactor = new THREE.Mesh(buttonGeometry, interMaterial);
    this.button4Interactor.position.set(.1, 1.45, -.2);
    this.button4Interactor.rotateX(Math.PI / 2 + .4);
    scene.add(this.button4Interactor);

    // Control Panel for VR Page
    this.panel = new THREE.Mesh(panelGeometry, interMaterial);
    this.panel.position.set(15, 15, 15);
    this.panel.rotateX(Math.PI / 2);
    this.panel.visible = false;
    scene.add(this.panel);

    // Settings Menu for VR Page
    this.settingsMenu = new THREE.Mesh(panelGeometry, interMaterial);
    this.settingsMenu.position.set(0, 1.51, -.12);
    this.settingsMenu.rotateX(Math.PI/2);
    this.settingsMenu.visible = false;
    scene.add(this.settingsMenu);

    // App 1
    this.app1 = new THREE.Mesh(appGeometry, appMaterial);
    this.app1.position.set(-.07, 1.515, -.19);
    this.app1.rotateX(Math.PI / 2);
    scene.add(this.app1);

    // App 2
    this.app2 = new THREE.Mesh(appGeometry, appMaterial);
    this.app2.position.set(0, 1.515, -.19);
    this.app2.rotateX(Math.PI / 2);
    scene.add(this.app2);
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
  getPanel() {
    return this.panel;
  }
  getApp1() {
    return this.app1;
  }
  getApp2() {
    return this.app2;
  }
  getsettingsMenu() {
    return this.settingsMenu;
  }
}