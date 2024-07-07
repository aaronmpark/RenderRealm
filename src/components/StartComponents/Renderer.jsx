import * as THREE from 'three';

export class Renderer {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000);
    document.body.appendChild(this.renderer.domElement);
  }

  getRenderer() {
    return this.renderer;
  }
}