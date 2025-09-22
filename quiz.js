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
      question: "Which was the first spacecraft to land on the Moon?",
      options: ["Apollo 11", "Luna 2", "Chandrayaan 1", "Vostok 1"],
      answer: "Luna 2"
    }
  ]
];

let currentLevel = 0;
let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  let q = quizLevels[currentLevel][currentQuestion];
  document.getElementById("question").textContent = q.question;

  let optionsHTML = "";
  q.options.forEach(opt => {
    optionsHTML += `<button onclick="checkAnswer('${opt}')">${opt}</button>`;
  });
  document.getElementById("options").innerHTML = optionsHTML;
}

function checkAnswer(selected) {
  let result = document.getElementById("result");
  if (selected === quizLevels[currentLevel][currentQuestion].answer) {
    score++;
    result.textContent = "✅ Correct!";
  } else {
    result.textContent = "❌ Wrong! The correct answer is " + quizLevels[currentLevel][currentQuestion].answer;
  }
}

function nextQuestion() {
  currentQuestion++;
  document.getElementById("result").textContent = "";

  if (currentQuestion < quizLevels[currentLevel].length) {
    loadQuestion();
  } else {
    checkLevelCompletion();
  }
}

function checkLevelCompletion() {
  if (score === quizLevels[currentLevel].length) {
    // Full score → Award badge & advance
    if (currentLevel === 0) {
      document.getElementById("quiz-container").innerHTML = `<h3>🎉 Level 1 Complete! 🥉 You earned a Bronze Badge!</h3><button onclick="nextLevel()">Go to Level 2 🚀</button>`;
    } else if (currentLevel === 1) {
      document.getElementById("quiz-container").innerHTML = `<h3>🎉 Level 2 Complete! 🥈 You earned a Silver Badge!</h3><button onclick="nextLevel()">Go to Level 3 🌌</button>`;
    } else if (currentLevel === 2) {
      document.getElementById("quiz-container").innerHTML = `<h3>🏆 Congratulations! You completed all Levels and earned the Golden Badge! 🌟</h3>`;
    }
  } else {
    // Not full score → Fail
    document.getElementById("quiz-container").innerHTML = `<h3>😢 You scored ${score}/${quizLevels[currentLevel].length}. Try Again!</h3><button onclick="restartQuiz()">Restart 🔄</button>`;
  }
}

function nextLevel() {
  currentLevel++;
  currentQuestion = 0;
  score = 0;
  loadQuestion();
}

function restartQuiz() {
  currentLevel = 0;
  currentQuestion = 0;
  score = 0;
  loadQuestion();
}

// Start Quiz
loadQuestion();
