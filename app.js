(function () {
  const planets = [
    { name: "Mercury", size: 6, color: "#bdbdbd", distance: 80, period: 4.8 },
    { name: "Venus", size: 10, color: "#e0c27a", distance: 110, period: 12.2 },
    { name: "Earth", size: 11, color: "#4a90e2", distance: 150, period: 16 },
    { name: "Mars", size: 8, color: "#c84a3a", distance: 190, period: 30 },
    { name: "Jupiter", size: 22, color: "#d6a37a", distance: 260, period: 120 },
    {
      name: "Saturn",
      size: 18,
      color: "#e6d1a3",
      distance: 340,
      period: 220,
      ring: true,
    },
    { name: "Uranus", size: 14, color: "#9fe0e8", distance: 420, period: 480 },
    { name: "Neptune", size: 14, color: "#4b6fff", distance: 480, period: 800 },
  ];

  const orbitsEl = document.getElementById("orbits");

  // create orbit elements
  planets.forEach((p, i) => {
    const orbit = document.createElement("div");
    orbit.className = "orbit rotate";
    // CSS variables for this planet
    const scale = Math.min(1.6, 60 + p.size) / 100;
    const diameter = p.distance * 2; // orbit track diameter
    orbit.style.setProperty("--distance", p.distance + "px");
    orbit.style.width = diameter + "px";
    orbit.style.height = diameter + "px";
    orbit.style.marginLeft = -(diameter / 2) + "px";
    orbit.style.marginTop = -(diameter / 2) + "px";
    orbit.style.zIndex = 5 - i;

    // duration controls how fast it rotates (shorter = faster)
    orbit.style.animationDuration = p.period + "s";

    // track
    const track = document.createElement("div");
    track.className = "track";
    track.style.width = "100%";
    track.style.height = "100%";

    // planet
    const planet = document.createElement("div");
    planet.className = "planet";
    planet.title = p.name;
    planet.setAttribute("aria-label", p.name);
    // place planet at right-most edge of orbit using transform translate
    const planetSize = Math.max(4, p.size);
    planet.style.width = planetSize + "px";
    planet.style.height = planetSize + "px";
    planet.style.background = p.color;
    planet.style.transform = `translate(${p.distance}px, -50%)`;

    // ring for Saturn
    if (p.ring) {
      const ring = document.createElement("div");
      ring.style.position = "absolute";
      ring.style.left = "50%";
      ring.style.top = "50%";
      ring.style.transform = `translate(${p.distance}px, -50%) rotateX(60deg)`;
      ring.style.width = planetSize * 3.6 + "px";
      ring.style.height = planetSize * 0.9 + "px";
      ring.style.borderRadius = "50% / 40%";
      ring.style.border = "2px solid rgba(255,255,255,0.12)";
      ring.style.pointerEvents = "none";
      orbit.appendChild(ring);
    }

    orbit.appendChild(track);
    orbit.appendChild(planet);
    orbitsEl.appendChild(orbit);
  });

  // UI: play/pause
  const toggle = document.getElementById("toggle-animation");
  let running = true;
  toggle.addEventListener("click", () => {
    running = !running;
    document.querySelectorAll(".orbit").forEach((o) => {
      o.style.animationPlayState = running ? "running" : "paused";
    });
    toggle.textContent = running ? "Pause" : "Play";
  });

  // scale control
  const scaleRange = document.getElementById("scaleRange");
  const scene = document.getElementById("scene");
  scaleRange.addEventListener("input", (e) => {
    const scale = e.target.value;
    scene.style.transform = `scale(${scale})`;
  });

  // accessibility: reduce motion if user prefers
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mq && mq.matches) {
    document
      .querySelectorAll(".orbit")
      .forEach((o) => (o.style.animationDuration = "0s"));
    document
      .querySelectorAll(".orbit")
      .forEach((o) => (o.style.animationPlayState = "paused"));
    toggle.disabled = true;
    toggle.textContent = "Animation disabled";
  }
})();
