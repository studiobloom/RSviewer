// Define variables
let camera, scene, renderer;

// Initialize the scene and start the animation loop
init();
animate();

function init() {
  // Create a new camera and position it
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 5;

  // Create a new scene
  scene = new THREE.Scene();

  // Load the GLB file
  const loader = new THREE.GLTFLoader();
  loader.load( 'https://raw.githubusercontent.com/studiobloom/RSviewer/main/xofty.glb', function ( gltf ) {
    scene.add( gltf.scene );
  }, undefined, function ( error ) {
    console.error( error );
  } );

  // Create a new renderer and add it to the container element
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.getElementById('container').appendChild( renderer.domElement );
}

function animate() {
  requestAnimationFrame( animate );

  // Rotate the scene
  scene.rotation.y += 0.005;

  // Render the scene
  renderer.render( scene, camera );
}
