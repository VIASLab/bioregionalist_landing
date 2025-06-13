/*document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('earth3d');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
  camera.position.z = 2;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(200, 200);

  // ✅ Aquí se asigna la clase "earth" para que funcione con los efectos
  renderer.domElement.classList.add("earth");

  container.appendChild(renderer.domElement);

  const geometry = new THREE.SphereGeometry(1, 64, 64);
  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load('assets/images/earth-texture.jpg');
  const bumpTexture = textureLoader.load('assets/images/bumpmap.jpg');

  const material = new THREE.MeshStandardMaterial({
    map: earthTexture,
    bumpMap: bumpTexture,
    bumpScale: 0.08,
    metalness: 0.3,
    roughness: 0.7
  });

  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  const pointLight = new THREE.PointLight(0xffffff, 1.3);
  pointLight.position.set(-3, 5, 2);
  scene.add(pointLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
  scene.add(ambientLight);

  let isHovering = false;
  let rotationTarget = 0;
  let rotationCurrent = 0;

  function animate() {
    requestAnimationFrame(animate);
    rotationCurrent += (rotationTarget - rotationCurrent) * 0.05;
    sphere.rotation.y = rotationCurrent;
    renderer.render(scene, camera);
  }

  animate();

  const wrapper = document.querySelector(".earth-wrapper");

  wrapper.addEventListener("mouseenter", () => {
    isHovering = true;
    rotationTarget = Math.PI;
  });

  wrapper.addEventListener("mouseleave", () => {
    isHovering = false;
    rotationTarget = 0;
  });
});
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


let rotationTarget = 0;
let rotationCurrent = 0;

export function setRotationActive(active) {
  rotationTarget = active ? Math.PI : 0;
}

 document.addEventListener("DOMContentLoaded", () => {
   const container = document.getElementById('earth3d');
 
   const scene = new THREE.Scene();
   const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
   camera.position.z = 2;
 
   const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
   renderer.setSize(200, 200);
 
   // ✅ Aquí se asigna la clase "earth" para que funcione con los efectos
   renderer.domElement.classList.add("earth");
 
   container.appendChild(renderer.domElement);
 
   const geometry = new THREE.SphereGeometry(1, 64, 64);
   const textureLoader = new THREE.TextureLoader();
   const earthTexture = textureLoader.load('assets/images/earth-texture.jpg');
   const bumpTexture = textureLoader.load('assets/images/bumpmap.jpg');
 
   const material = new THREE.MeshStandardMaterial({
     map: earthTexture,
     bumpMap: bumpTexture,
     bumpScale: 0.08,
     metalness: 0.3,
     roughness: 0.7
   });
 
   const sphere = new THREE.Mesh(geometry, material);
   scene.add(sphere);
 
   const pointLight = new THREE.PointLight(0xffffff, 1.3);
   pointLight.position.set(-3, 5, 2);
   scene.add(pointLight);
 
   const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
   scene.add(ambientLight);
 
   function animate() {
     requestAnimationFrame(animate);
     rotationCurrent += (rotationTarget - rotationCurrent) * 0.05;
     sphere.rotation.y = rotationCurrent;
     renderer.render(scene, camera);
   }
 
   animate();

 });

