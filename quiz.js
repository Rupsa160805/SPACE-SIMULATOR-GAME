// ===== QUIZ DATA =====
const quizLevels = [
  // Level 1 (Easy)
  [
    {
      question: "Which planet is called the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      answer: "Mars"
    },
    {
      question: "Which is the largest planet in our solar system?",
      options: ["Saturn", "Jupiter", "Neptune", "Earth"],
      answer: "Jupiter"
    },
    {
      question: "Who was the first person to walk on the Moon?",
      options: ["Yuri Gagarin", "Buzz Aldrin", "Neil Armstrong", "Kalpana Chawla"],
      answer: "Neil Armstrong"
    }
  ],

  // Level 2 (Medium)
  [
    {
      question: "What is the name of India’s first satellite?",
      options: ["Aryabhata", "Chandrayaan", "Mangalyaan", "Chandrayaan 3"],
      answer: "Aryabhata"
    },
    {
      question: "Which planet has the most moons?",
      options: ["Mars", "Jupiter", "Saturn", "Neptune"],
      answer: "Saturn"
    },
    {
      question: "Which is the hottest planet in our solar system?",
      options: ["Mercury", "Venus", "Mars", "Earth"],
      answer: "Venus"
    }
  ],

  // Level 3 (Hard)
  [
    {
      question: "What is the name of a space object so strong that not even light can escape from it?",
      options: ["Supernova", "Black Hole", "Galaxy", "Neutron Star"],
      answer: "Black Hole"
    },
    {
      question: "What is the center of our galaxy called?",
      options: ["Andromeda", "Milky Way", "Sagittarius A*", "Orion Belt"],
      answer: "Sagittarius A*"
    },
    {
      question: "Which planet is called Earth’s “twin” because of its size and structure?",
      options: ["Venus", "Mars", "Neptune", "Saturn"],
      answer: "Venus"
    }
  ]
];

// ===== STATE =====
let currentLevel = 0;
let currentQuestion = 0;
let score = 0;

// ===== BADGES =====
const badges = {
  bronze: "🥉 Bronze Badge",
  silver: "🥈 Silver Badge",
  gold: "🏆 Golden Badge"
};

// ===== LOAD QUESTION =====
function loadQuestion() {
  let q = quizLevels[currentLevel][currentQuestion];
  document.getElementById("question").textContent = `Level ${currentLevel + 1}: ${q.question}`;

  let optionsHTML = "";
  q.options.forEach(opt => {
    optionsHTML += `<button onclick="checkAnswer('${opt}')">${opt}</button>`;
  });
  document.getElementById("options").innerHTML = optionsHTML;
}

// ===== CHECK ANSWER =====
function checkAnswer(selected) {
  let result = document.getElementById("result");
  if (selected === quizLevels[currentLevel][currentQuestion].answer) {
    score++;
    result.textContent = "✅ Correct!";
  } else {
    result.textContent = "❌ Wrong! The correct answer is " + quizLevels[currentLevel][currentQuestion].answer;
  }
}

// ===== NEXT QUESTION =====
function nextQuestion() {
  currentQuestion++;
  document.getElementById("result").textContent = "";

  if (currentQuestion < quizLevels[currentLevel].length) {
    loadQuestion();
  } else {
    checkLevelCompletion();
  }
}

// ===== LEVEL COMPLETION =====
function checkLevelCompletion() {
  if (score === quizLevels[currentLevel].length) {
    // Earn badge
    if (currentLevel === 0) {
      addBadge(badges.bronze);
      alert("🎉 Level 1 Complete! You earned a Bronze Badge!");
      nextLevel();
    } else if (currentLevel === 1) {
      addBadge(badges.silver);
      alert("🎉 Level 2 Complete! You earned a Silver Badge!");
      nextLevel();
    } else if (currentLevel === 2) {
      addBadge(badges.gold);
      alert("🏆 Congratulations! You completed all Levels and earned the Golden Badge!");
      document.getElementById("quiz-container").innerHTML =
        `<h3>🌟 All Levels Complete! 🌟</h3><p>Check your profile for badges!</p>`;
    }
  } else {
    // Not full score → Restart quiz
    alert(`😢 You scored ${score}/${quizLevels[currentLevel].length}. Try Again!`);
    restartQuiz();
  }
}

// ===== NEXT LEVEL =====
function nextLevel() {
  currentLevel++;
  currentQuestion = 0;
  score = 0;
  loadQuestion();
}

// ===== RESTART QUIZ =====
function restartQuiz() {
  currentLevel = 0;
  currentQuestion = 0;
  score = 0;
  document.getElementById("quiz-container").innerHTML = `
    <p id="question">Loading question...</p>
    <div id="options"></div>
    <button onclick="nextQuestion()">Next</button>
    <p id="result"></p>
  `;
  loadQuestion();
}

// ===== ADD BADGE TO PROFILE =====
function addBadge(badgeText) {
  let badgeDiv = document.getElementById("badges");
  let badge = document.createElement("p");
  badge.textContent = badgeText;
  badgeDiv.appendChild(badge);
}

// ===== START QUIZ =====
loadQuestion();

