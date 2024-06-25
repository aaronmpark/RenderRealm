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
camera.position.set(2,6,10);
camera.lookAt(0,0,0);

// Raycaster and mouse vector
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let clickableClicked = false;
let buttonPressed = false;

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
const loader = new GLTFLoader().setPath('public/models/');

let desk;
loader.load('StandingDesk.glb', (glb) => {
    desk = glb.scene;
    desk.position.set(0,.55, 0);
    desk.scale.set(2,1.5,2.5);
    
    desk.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

    scene.add(desk);
})

let comp;
loader.load('CompDesk.glb', (glb) => {
    comp = glb.scene;
    comp.position.set(-.2, 1.4, 0);
    comp.scale.set(.003,.003,.003);
    comp.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    scene.add(comp);
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
const interGeometry = new THREE.BoxGeometry(1.1, .7, .02);
const interMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const interactor = new THREE.Mesh(interGeometry, interMaterial);
interactor.position.set(-.2, 1.9, 0);
interactor.castShadow = false;
interactor.receiveShadow = false;
interactor.visible = false;
scene.add(interactor);

// start Button for the Monitor
const buttonGeometry = new THREE.BoxGeometry(1.1, .7, .02);
const button = new THREE.Mesh(buttonGeometry, interMaterial);
button.position.set(-.2, 1.9, 0);
button.visible = false;
scene.add(button);

const screenLight = new THREE.PointLight(0xffffff, 20, 1);
screenLight.position.set(-.2,1.9,0);
screenLight.visible = false;
scene.add(screenLight);


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

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Event listener for mouse click
function onMouseClick(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera); 

    const intersects = raycaster.intersectObjects([interactor]);

    if (intersects.length > 0 && !clickableClicked && (camera.position.z > 2.8)) {
        clickableClicked = true;
        console.log('Clickable object clicked!', clickableClicked);
    }
}

window.addEventListener('click', onMouseClick, false);

async function zoomScreen(){
  await wait(500);
  loader.load('monitorScreen.glb', (glb) => {
    const mesh = glb.scene;
    mesh.position.set(-.418, 1.167, .44);
    mesh.scale.set(.985,.85,1);
    scene.add(mesh);
  })
  screenLight.visible = true;
  await wait(1000);
  camera.position.z -= .08;
  await wait(150);
  comp.visible = false;
  desk.visible = false;
  renderer.setClearColor(0xffffff);
  groundMesh.visible = false;
}


function adjustScreen(){
  controls.enabled = false;
  if (camera.position.z > 2.8){
    camera.position.z -= 0.05;
  }
  if (camera.position.y > 1.9){
    camera.position.y -= 0.05;
  }
  if (camera.position.x > -.2){
    camera.position.x -= 0.05;
  }
  if (camera.position.x < -.2){
    camera.position.x += 0.05;
  }

  camera.lookAt(-.2,1.9,0);
}

function checkPosition(){
  const targetPosition = new THREE.Vector3(-.2,1.9,2.8);
  const tolerance = 0.05;
  if (clickableClicked && (Math.abs(camera.position.x - targetPosition.x) < tolerance &&
  Math.abs(camera.position.y - targetPosition.y) < tolerance &&
  Math.abs(camera.position.z - targetPosition.z) < tolerance)) {
    console.log("Camera at Position!");
    buttonPressed = true;
  }
}


function animate() {
    requestAnimationFrame(animate);
    
    checkPosition();

    if (buttonPressed) {
      zoomScreen();
    }
    else if (clickableClicked && !buttonPressed) {
        adjustScreen();
        console.log("ADJUSTING");
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

// steps:
// create an object (shows on the middle of the screen thing) -> only allow it to be pressed on when the boolean of the zoom is already in
// when the zoom is there, block can be clicked on -> (boolean only done ONCE the thing is FUUUULLY zoomed in)
// the block will then zoom into the screen (white screen?) -> and then switch over to the next sao screen once it is zoomed in there too


// some of the interaction stuff is clunky -> work around some of the sizes of the boxes
// have an object created -> and have the "zoom in" effect
// need to make it so that it doesn't no-clip into the screen
// and rather go into a WHITE screen? or black screen idk


// todo NOW!!!
// move the camera back a lil bit of z axis
// when click on button, zoom in QUICK
// go to black and transition maybe other camera location
// boom

// possibly remove the 2nd button activation -> rather just do once it is zoomed in, wait a second or two, then turn the screen white (computer), then zooom in fast