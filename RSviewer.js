window.addEventListener("resize", onWindowResize, false);

var scene = new THREE.Scene();


var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//camera
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var controls = new THREE.OrbitControls( camera );


camera.position.set(5, 7, 10);
camera.lookAt(0, 0, 0);
controls.update();

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}


var light = new THREE.PointLight(0xffffff, 1, 500);
light.position.set(0, 20, 20);
light.castShadow = true; 
scene.add(light);

//Set up shadow properties for the light
light.shadow.mapSize.width = 512;  // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5;       // default
light.shadow.camera.far = 500      // default


var ambientlight = new THREE.AmbientLight(0xffffff, 1, 500);
ambientlight.position.set(0, 10, 10);
scene.add(ambientlight);


var geometry = new THREE.PlaneGeometry( 50, 30, 50 );
var material = new THREE.MeshBasicMaterial( {color: 0x0c4e03, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
plane.rotation.x = Math.PI / 2;
plane.receiveShadow = true;
scene.add( plane );


var loader = new THREE.GLTFLoader();

  var modelobject = loader.load(
  "https://raw.githubusercontent.com/studiobloom/RSviewer/blob/main/xofty.glb",
    //onLoad
    function(modelobject) {
      modelobject.scene.scale.set(0.5, 0.5, 0.5);
      modelobject.castShadow = true;
      modelobject.receiveShadow = false;
      scene.add(modelobject.scene);
    }
  );

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();

