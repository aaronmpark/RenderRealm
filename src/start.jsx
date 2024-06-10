import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);


renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

camera.position.set(4,5,11);
camera.lookAt(0,0,0);

const groundGeo = new THREE.PlaneGeometry(20,20,32,32);
groundGeo.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x555555,
    side: THREE.DoubleSide
});

const groundMesh = new THREE.Mesh(groundGeo, groundMaterial);
groundMesh.castShadow = false;
groundMesh.receiveShadow = true;
scene.add(groundMesh);

const spotLight = new THREE.SpotLight(0xffffff, 3000, 100, 0.22, 1);
spotLight.position.set(0,25,0);
spotLight.castShadow = true;
spotLight.shadow.bias = -0.0001;
scene.add(spotLight);

const loader = new GLTFLoader().setPath('public/');
loader.load('StandingDesk.glb', (glb) => {
    const mesh = glb.scene;
    mesh.position.set(0,.55, 0);
    mesh.scale.set(2,1.5,2.5);
    
    mesh.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

    scene.add(mesh);
})

loader.load('CompDesk.glb', (glb) => {
    const mesh2 = glb.scene;
    mesh2.position.set(-.2, 1.4, 0);
    mesh2.scale.set(.003,.003,.003);
    scene.add(mesh2);
})

loader.load('HangingLantern.glb', (glb) => {
    const mesh2 = glb.scene;
    mesh2.position.set(0, 7, 0);
    scene.add(mesh2);
})

loader.load('chain.glb', (glb) => {
    const mesh2 = glb.scene;
    mesh2.position.set(0, 9.5, 0);
    mesh2.scale.set(1.75,5,1.75);
    scene.add(mesh2);
})

const lanternLight = new THREE.PointLight(0xffffff, 50, 9);
lanternLight.position.set(0, 4, 0);
lanternLight.castShadow = true;
scene.add(lanternLight);



const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 1.75, 0);
controls.update();


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();



//when click on the middle of the screen (create object that can be clicked on ?)
// set camera position forwards within the animate (check ffor a boolean/ something) 
// if boolean true or whatever then camera moves forwards, and just go towards the screen
// then make it look directly mainly on screen 
// show other object of screen thing maybe
// click again to go to SAO page
