// ===== SETUP SCENE ===== 
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight * 0.8);
document.getElementById("game").appendChild(renderer.domElement);

// ===== LIGHTS =====
let light = new THREE.PointLight(0xffffff, 1.5, 100);
light.position.set(10, 10, 10);
scene.add(light);

// ===== EARTH =====
let earthTexture = new THREE.TextureLoader().load(
  "https://threejsfundamentals.org/threejs/resources/images/earthmap1k.jpg"
);
let earth = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshPhongMaterial({ map: earthTexture })
);
scene.add(earth);

// ===== ROCKET =====
let rocket = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.5, 3, 32),
  new THREE.MeshPhongMaterial({ color: "red" })
);
rocket.position.set(0, 3, 5);
scene.add(rocket);

// ===== STARS =====
function createStars() {
  let starGeo = new THREE.SphereGeometry(0.05, 24, 24);
  let starMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  for (let i = 0; i < 500; i++) {
    let star = new THREE.Mesh(starGeo, starMat);
    star.position.set(
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100
    );
    scene.add(star);
  }
}
createStars();

// ===== CAMERA =====
camera.position.z = 10;

// ===== ANIMATION LOOP =====
function animate() {
  requestAnimationFrame(animate);

  earth.rotation.y += 0.002; // Earth spins
  rocket.rotation.x += 0.01; // Rocket rotates
  rocket.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();

// ===== MISSIONS =====
function startMission(type) {
  if (type === "satellite") {
    window.location.href = "satellite.html"; // new page
  } else if (type === "moon") {
    alert("🌙 Moon Mission: Reach the Moon!");
    rocket.position.y = 10;
  } else if (type === "mars") { 
    alert("🔴 Mars Mission: Travel to the Red Planet!");
    rocket.position.y = 15;
  } else if (type === "zodiac") {
    window.location.href = "zodiac.html"; // open zodiac page
  }
}
