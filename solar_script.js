import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// ---- BASIC SETUP ----
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
);
camera.position.set(-270, 50, 320);
let isPlaying = true; // play/pause toggle
let speedMultiplier = 0.1;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0x070711);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.maxDistance = 3000;
controls.minDistance = 40;

// Play/Pause button
const playPauseBtn = document.getElementById('play-pause-btn');
playPauseBtn.addEventListener('click', () => {
  isPlaying = !isPlaying;
  playPauseBtn.textContent = isPlaying ? 'Pause' : 'Play';
});

// Speed slider
const speedSlider = document.getElementById('speed-slider');
const speedValue = document.getElementById('speed-value');
speedSlider.addEventListener('input', () => {
  speedMultiplier = parseFloat(speedSlider.value);
  speedValue.textContent = speedMultiplier.toFixed(1) + 'x';
});

// ---- LIGHTING ----
const ambientLight = new THREE.AmbientLight(0xffffff, 2.3);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 4, 2500);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

// ---- BACKGROUND STARS ----
function addStars() {
  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1.2,
    sizeAttenuation: true,
    opacity: 0.99,
    transparent: true,
  });
  const starVertices = [];
  for (let i = 0; i < 18000; i++) {
    starVertices.push(
      THREE.MathUtils.randFloatSpread(5000),
      THREE.MathUtils.randFloatSpread(5000),
      THREE.MathUtils.randFloatSpread(5000)
    );
  }
  starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starVertices, 3)
  );
  scene.add(new THREE.Points(starGeometry, starMaterial));
}
addStars();

// ---- TEXTURES ----
const textureLoader = new THREE.TextureLoader();

function createCelestialBody(
  size,
  texture,
  distance,
  orbitalSpeed,
  rotationSpeed,
  parentObject,
  ring
) {
  const geo = new THREE.SphereGeometry(size, 64, 64);
  const mat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture),
    metalness: 0.64,
    roughness: 0.33,
    emissive: 0x222222,
    emissiveIntensity: 0.48,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.x = distance; // Make sure planets are placed on x-axis for flat orbits
  mesh.rotationSpeed = rotationSpeed;

  const orbitAnchor = new THREE.Object3D();
  orbitAnchor.orbitalSpeed = orbitalSpeed;
  orbitAnchor.add(mesh);

  if (ring) {
    const ringGeo = new THREE.RingGeometry(ring.inner, ring.outer, 96);
    const ringMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(ring.texture),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.x = distance;
    ringMesh.rotation.x = -0.5 * Math.PI;
    orbitAnchor.add(ringMesh);
  }

  // Create flat orbit line in XZ plane
  const ellipse = new THREE.EllipseCurve(
    0,
    0,
    distance,
    distance,
    0,
    2 * Math.PI,
    false,
    0
  );
  const points = ellipse.getPoints(128);
  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(
    points.map((p) => new THREE.Vector3(p.x, 0, p.y))
  );
  const orbitMaterial = new THREE.LineBasicMaterial({
    color: 0xdddddd,
    transparent: true,
    opacity: 0.28,
  });
  const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
  scene.add(orbitLine);

  parentObject.add(orbitAnchor);
  return { mesh, orbitAnchor };
}

// ---- SUN ----
const sunGeo = new THREE.SphereGeometry(20, 72, 72);
const sunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load("./sun.jpg"),
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

// Glow effect for the Sun
const spriteMaterial = new THREE.SpriteMaterial({
  map: textureLoader.load(
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/lensflare/lensflare0_alpha.png"
  ),
  color: 0xffffbb,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});
const sprite = new THREE.Sprite(spriteMaterial);
sprite.scale.set(100, 100, 1);
sun.add(sprite);

// ---- PLANETS ----
const planetData = [
  { size: 4.5, texture: "./mercury.jpg", distance: 40, orbitalSpeed: 0.064, rotationSpeed: 0.008 },
  { size: 7, texture: "./venus.jpg", distance: 60, orbitalSpeed: 0.025, rotationSpeed: 0.002 },
  { size: 8, texture: "./earth.jpg", distance: 105, orbitalSpeed: 0.016, rotationSpeed: 0.030 },
  { size: 6.5, texture: "./mars.jpg", distance: 150, orbitalSpeed: 0.011, rotationSpeed: 0.025 },
  { size: 18, texture: "./jupiter.jpg", distance: 230, orbitalSpeed: 0.004, rotationSpeed: 0.055 },
  { size: 15, texture: "./saturn.jpg", distance: 305, orbitalSpeed: 0.0019, rotationSpeed: 0.045, ring: { inner: 18, outer: 30, texture: "./saturn_ring.jpg" } },
  { size: 10, texture: "./uranus.jpg", distance: 370, orbitalSpeed: 0.0011, rotationSpeed: 0.038 },
  { size: 10, texture: "./neptune.jpg", distance: 430, orbitalSpeed: 0.0007, rotationSpeed: 0.037 },
];

const planets = planetData.map((p) =>
  createCelestialBody(p.size, p.texture, p.distance, p.orbitalSpeed, p.rotationSpeed, sun, p.ring)
);

// Earth's Moon
const moon = createCelestialBody(2.0, "./moon.jpg", 15, 0.055, 0.008, planets[2].mesh);

// ---- ANIMATION LOOP ----
function animate() {
  if (isPlaying) {
    sun.rotateY(0.002 * speedMultiplier);

    planets.forEach(({ mesh, orbitAnchor }) => {
      mesh.rotateY(mesh.rotationSpeed * speedMultiplier);
      orbitAnchor.rotateY(orbitAnchor.orbitalSpeed * speedMultiplier);
    });

    moon.mesh.rotateY(moon.mesh.rotationSpeed * speedMultiplier);
    moon.orbitAnchor.rotateY(moon.orbitAnchor.orbitalSpeed * speedMultiplier);
  }

  controls.update();
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// ---- WINDOW RESIZE HANDLER ----
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
