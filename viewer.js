let camera, scene, renderer;

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 10000);
  camera.position.z = 500;

  scene = new THREE.Scene();

  const loader = new THREE.GLTFLoader();
  loader.load('https://raw.githubusercontent.com/studiobloom/RSviewer/main/xofty.glb', function (gltf) {
    scene.add(gltf.scene);
  }, undefined, function (error) {
    console.error(error);
  });

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('container').appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);

  scene.rotation.y += 0.005;

  renderer.render(scene, camera);
}
