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

// Raycaster and mouse vector
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let clickableClicked = false;

// Ground materials
const groundGeo = new THREE.PlaneGeometry(20,20,32,32);
groundGeo.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x555555,
    side: THREE.DoubleSide
});

//Ground Mesh
const groundMesh = new THREE.Mesh(groundGeo, groundMaterial);
groundMesh.castShadow = false;
groundMesh.receiveShadow = true;
scene.add(groundMesh);

//Spotlight 
const spotLight = new THREE.SpotLight(0xffffff, 3000, 100, 0.22, 1);
spotLight.position.set(0,25,0);
spotLight.castShadow = true;
spotLight.shadow.bias = -0.0001;
scene.add(spotLight);

//Loaders for the GLB files
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
    const mesh = glb.scene;
    mesh.position.set(-.2, 1.4, 0);
    mesh.scale.set(.003,.003,.003);
    mesh.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    scene.add(mesh);
})

loader.load('HangingLantern.glb', (glb) => {
    const mesh = glb.scene;
    mesh.position.set(0, 7, 0);
    scene.add(mesh);
})

loader.load('chain.glb', (glb) => {
    const mesh = glb.scene;
    mesh.position.set(0, 9.5, 0);
    mesh.scale.set(1.75,5,1.75);
    scene.add(mesh);
})

// Light for the Lantern
const lanternLight = new THREE.PointLight(0xfffffff, 50, 9);
lanternLight.position.set(0, 4, 0);
scene.add(lanternLight);

//Screen in the middle of Monitor
const interGeometry = new THREE.BoxGeometry(1.1, .6, .02);
const interMaterial = new THREE.MeshStandardMaterial({ color: 0xffffd2 });
const interactor = new THREE.Mesh(interGeometry, interMaterial);
interactor.position.set(-.2, 1.9, 0); // Match the lantern's position
interactor.castShadow = false;
interactor.receiveShadow = false;
interactor.visible = false;
scene.add(interactor);

// start Button for the Monitor
// find a model to use
// do same thing done with interactor, and change the onMouseClick() function to take in the other jaunt with the intersection
// have some sort of if statement to check for IF the camera is zoomed in,
// if the camera is zoomed in, allow for the intersection checker to even start checking for if the guy pressed DA BUTTON
// if press button, do some jauntations boolean stuff other jaunts 

//Controls so you can move around the page
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 1.75, 0);

// Event listener for mouse click
function onMouseClick(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects([interactor]);

    if (intersects.length > 0 && !clickableClicked && (camera.position.z > 1.5)) {
        clickableClicked = true;
        console.log('Clickable object clicked!', clickableClicked);
    }
}

window.addEventListener('click', onMouseClick, false);

function adjustScreen(){
  controls.enabled = false;
  if (camera.position.z > 1.5){
    camera.position.z -= 0.05;
  }
  if (camera.position.y > 2){
    camera.position.y -= 0.05;
  }
  if (camera.position.x > -.1){
    camera.position.x -= 0.05;
  }
  if (camera.position.x < -.1){
    camera.position.x += 0.05;
  }
  camera.lookAt(-.1,1.85,0);
}

function animate() {
    requestAnimationFrame(animate);


      if (clickableClicked) {
        adjustScreen();
    } 
    else {
        controls.update();
    }
    renderer.render(scene, camera);
}

animate();


// then make it look directly mainly on screen 
// show other object of screen thing maybe
// click again to go to SAO page

// on side if i want to -> change the model of the PC to something that i personally model -> for future
// personally model my current keyboard -> for like for fun to show i know how to use things like blender ? 

// START SIMULATION ON MIDDLE OF SCREEN
// when press button -> zoom in to the jaunt and make screen WHITE and then load next page -> white SAO transition awesome cleanness awesomeness yea

// USE OBJECT CREATED -> FIND A WAY TO SET A BOOLEAN WHEN CLICKED ON THE SCREEN... WHEN CLICKED AND PRESS THE SIMULATION BUTTOn, SET OTHER BOOLEANS AND SET USESTATE VARIABLE AS TRUE
// SO ON THE OTHER PAGE, IT WILL KNOW TO DO THE ZOOM

// TODO NOW:
// create a "simulation start screen for the computer screen"
// add another small "press button" -> to redirect to the next page
// with the new press button -> when they press it, it zooms the camera FURTHER into the monitor
// after it gets to a certain point + something with colors -> goes to sao part

// then add light flickering