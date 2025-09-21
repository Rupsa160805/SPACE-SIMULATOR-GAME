(function () {
  const planets = [
    {
      name: "Mercury",
      size: 6,
      color: "#bdbdbd",
      distance: 80,
      period: 4.8,
      funFact: "A year on Mercury is just 88 Earth days long!",
    },
    {
      name: "Venus",
      size: 10,
      color: "#e0c27a",
      distance: 110,
      period: 12.2,
      funFact: "Venus rotates backward compared to most other planets.",
    },
    {
      name: "Earth",
      size: 11,
      color: "#4a90e2",
      distance: 150,
      period: 16,
      funFact: "Earth is the only planet not named after a Roman god or goddess.",
    },
    {
      name: "Mars",
      size: 8,
      color: "#c84a3a",
      distance: 190,
      period: 30,
      funFact: "Mars has the tallest mountain in the solar system, Olympus Mons!",
    },
    {
      name: "Jupiter",
      size: 22,
      color: "#d6a37a",
      distance: 260,
      period: 120,
      funFact: "Jupiter's 'Great Red Spot' is a storm bigger than Earth.",
    },
    {
      name: "Saturn",
      size: 18,
      color: "#e6d1a3",
      distance: 340,
      period: 220,
      ring: true,
      funFact: "Saturn's rings are made of ice, rocks, and dust.",
    },
    {
      name: "Uranus",
      size: 14,
      color: "#9fe0e8",
      distance: 420,
      period: 480,
      funFact: "Uranus rotates on its side, like a rolling ball!",
    },
    {
      name: "Neptune",
      size: 14,
      color: "#4b6fff",
      distance: 480,
      period: 800,
      funFact: "Neptune's winds are the fastest in the solar system.",
    },
  ];

  // Object for sun details
  const sunDetails = {
    name: "Sun",
    funFact: "The sun is so big that about one million Earths could fit inside it!",
    color: "yellow",
  };

  const orbitsEl = document.getElementById("orbits");
  const detailsEl = document.getElementById("planet-details");
  const sunEl = document.getElementById("sun");

  // Add click event listener to the sun
  sunEl.addEventListener("click", () => {
    detailsEl.innerHTML = `
      <h2 style="color: ${sunDetails.color};">${sunDetails.name}</h2>
      <h3>Fun Fact:</h3>
      <p>${sunDetails.funFact}</p>
    `;
  });

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
    // Increased minimum size to 8px to make smaller planets easier to click
    const planetSize = Math.max(8, p.size);
    planet.style.width = planetSize + "px";
    planet.style.height = planetSize + "px";
    planet.style.background = p.color;
    planet.style.transform = `translate(${p.distance}px, -50%)`;

    // Add click event listener to the planet
    planet.addEventListener("click", () => {
      detailsEl.innerHTML = `
        <h2 style="color: ${p.color};">${p.name}</h2>
        <p>Size: ${p.size}</p>
        <p>Distance from Sun: ${p.distance} million km</p>
        <p>Orbital Period: ${p.period} Earth days</p>
        <br>
        <h3>Fun Fact:</h3>
        <p>${p.funFact}</p>
      `;
    });

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



