import './style.css'
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { materialMetalness, sRGBTransferOETF } from 'three/src/nodes/TSL.js';
import { metalness } from 'three/tsl';
import { MeshBasicMaterial } from 'three/webgpu';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);


renderer.render( scene, camera );

/*
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight)
scene.add(lightHelper)
*/

//const controls = new OrbitControls(camera, renderer.domElement);

//Stars

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial( {color: 0xffffff } );
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);


//Space background

const spaceTexture = new THREE.TextureLoader().load('../resources/space.jpg');
spaceTexture.colorSpace = THREE.SRGBColorSpace;
scene.background = spaceTexture;


// Avatar

const felixTexture = new THREE.TextureLoader().load('./resources/felix.jpg');
felixTexture.colorSpace = THREE.SRGBColorSpace;

const felix = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1), 
  new THREE.MeshBasicMaterial({ map: felixTexture, side: THREE.DoubleSide })
);

felix.quaternion.copy(camera.quaternion);

felix.position.z = 4;
felix.position.y = 0;
felix.position.x = 1.5;

scene.add(felix);


//UEX

const UEX_Rotate = new THREE.Object3D( );
const loader = new GLTFLoader();

loader.load('./resources/uex.glb', function (gltf){
  const model=gltf.scene;
  model.material = THREE.MeshBasicMaterial;

  /*
  model.scale.set(0.1, 0.1, 0.1);
  model.position.z = 10;
  model.position.y = -10;
  model.position.x = -12;
  */
  const box = new THREE.Box3( ).setFromObject( model );
  const c = box.getCenter( new THREE.Vector3( ) );
  const size = box.getSize( new THREE.Vector3( ) ); 
  model.position.set( -c.x, size.y / 2 - c.y, -c.z );

  UEX_Rotate.add( model );
  UEX_Rotate.scale.set( 0.1, 0.1, 0.1 );
  UEX_Rotate.position.z = 5;
  UEX_Rotate.position.y = -8;
  UEX_Rotate.position.x = -22;

  scene.add(UEX_Rotate);
});


//Udemy

const udemyTexture = new THREE.TextureLoader().load('./resources/udemy.png');
udemyTexture.colorSpace = THREE.SRGBColorSpace;

const udemy = new THREE.Mesh(
  new THREE.SphereGeometry(2),
  new THREE.MeshBasicMaterial( { map: udemyTexture } )
);

udemy.position.z = 5;
udemy.position.y = -2;
udemy.position.x = -10;

scene.add(udemy);


//Linkedin

const linkedinTexture = new THREE.TextureLoader().load('./resources/linkedin.png');
linkedinTexture.colorSpace = THREE.SRGBColorSpace;

const linkedin = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( { map: linkedinTexture } )
);

linkedin.position.z = 60;
linkedin.position.y = 3;
linkedin.position.x = -15;

scene.add(linkedin);


//Gmail

/*
const gmailTexture = new THREE.TextureLoader().load('./resources/gmail.png');
gmailTexture.colorSpace = THREE.SRGBColorSpace;

const gmail = new THREE.Mesh(
  new THREE.BoxGeometry(0.5,3,4),
  new THREE.MeshBasicMaterial( { map: gmailTexture } )
);

gmail.position.z = 60;
gmail.position.y = -3;
gmail.position.x = -15;

scene.add(gmail);
*/

const gmail_Rotate = new THREE.Object3D( );

loader.load('./resources/gmail.glb', function (gltf){
  const model=gltf.scene;
  model.material = THREE.MeshBasicMaterial;

  /*
  model.scale.set(0.1, 0.1, 0.1);
  model.position.z = 10;
  model.position.y = -10;
  model.position.x = -12;
  */
  const box = new THREE.Box3( ).setFromObject( model );
  const c = box.getCenter( new THREE.Vector3( ) );
  const size = box.getSize( new THREE.Vector3( ) ); 
  model.position.set( -c.x, size.y / 2 - c.y, -c.z );

  gmail_Rotate.add( model );
  gmail_Rotate.scale.set( 0.1, 0.1, 0.1 );
  gmail_Rotate.position.z = 65;
  gmail_Rotate.position.y = -18;
  gmail_Rotate.position.x = -46;


  scene.add(gmail_Rotate);
});


//Light

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);


//Rotation

function animateRotation() {
  requestAnimationFrame( animateRotation );

  udemy.rotation.x += 0.01;
  udemy.rotation.y += 0.005;
  udemy.rotation.z += 0.01;
  
  UEX_Rotate.rotation.y += 0.01;   
  gmail_Rotate.rotation.y += 0.01;   

  linkedin.rotation.x += 0.01;
  linkedin.rotation.y += 0.005;
  linkedin.rotation.z += 0.01;

  /*
  gmail.rotation.x += 0.01;
  gmail.rotation.y += 0.005;
  gmail.rotation.z += 0.01;
  */

  renderer.render( scene, camera );
}

animateRotation();


//Camera

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// RESIZEABLE
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render( scene, camera );
}
