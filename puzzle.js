const puzzleContainer = document.getElementById("puzzle-container");

let scrambled = ["🌍 Earth", "🪐 Saturn", "☀️ Sun", "🌕 Moon"];
let correctOrder = ["☀️ Sun", "🌍 Earth", "🌕 Moon", "🪐 Saturn"];

function loadPuzzle() {
  puzzleContainer.innerHTML = `
    <p>Arrange the planets/celestial objects in correct order from Sun → Outwards:</p>
    <div id="options">${scrambled.map((item, i) => `<button onclick="selectOption(${i})">${item}</button>`).join("")}</div>
    <p id="result"></p>
  `;
}

let selectedOrder = [];

function selectOption(i) {
  selectedOrder.push(scrambled[i]);
  if (selectedOrder.length === correctOrder.length) {
    checkPuzzle();
  }
}

function checkPuzzle() {
  if (JSON.stringify(selectedOrder) === JSON.stringify(correctOrder)) {
    document.getElementById("result").innerText = "🎉 Correct Order! Well done!";
  } else {
    document.getElementById("result").innerText = "❌ Wrong order. Try again!";
  }
  selectedOrder = [];
}

loadPuzzle();
