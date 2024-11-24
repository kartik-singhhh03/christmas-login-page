// Snowfall Effect using Three.js
const container = document.getElementById("threejs-container");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

// Configure renderer
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Snow particles setup
const snowCount = 2000;
const snowGeometry = new THREE.BufferGeometry();
const snowMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.1,
  transparent: true,
});

const positions = new Float32Array(snowCount * 3);
for (let i = 0; i < snowCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 50; // x
  positions[i * 3 + 1] = Math.random() * 50; // y
  positions[i * 3 + 2] = (Math.random() - 0.5) * 50; // z
}

snowGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const snowParticles = new THREE.Points(snowGeometry, snowMaterial);
scene.add(snowParticles);

// Camera position
camera.position.z = 15;

// Snowfall animation
function animateSnow() {
  const positions = snowGeometry.attributes.position.array;
  for (let i = 1; i < positions.length; i += 3) {
    positions[i] -= 0.1;
    if (positions[i] < -25) {
      positions[i] = Math.random() * 50;
    }
  }
  snowGeometry.attributes.position.needsUpdate = true;

  renderer.render(scene, camera);
  requestAnimationFrame(animateSnow);
}

// Responsive window resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
animateSnow();
