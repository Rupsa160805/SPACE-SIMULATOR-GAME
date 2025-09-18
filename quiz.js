const quizData = [
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter"], answer: "Mars" },
  { question: "Who was the first person to walk on the Moon?", options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin"], answer: "Neil Armstrong" },
  { question: "Which is the largest planet in our Solar System?", options: ["Saturn", "Jupiter", "Neptune"], answer: "Jupiter" }
  { question: "What is the name of India’s first satellite?", options: ["Aryabhata", "Chandrayaan", "Mangalyaan"], answer: "Aryabhata" },
  { question: "What is the name of a space object so strong that not even light can escape from it?", options: ["Supernova", "Black Hole", "Galaxy"], answer: "Black Hole" },
];

let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById("quiz-container");

function loadQuiz() {
  if (currentQuestion < quizData.length) {
    const q = quizData[currentQuestion];
    quizContainer.innerHTML = `
      <h3>${q.question}</h3>
      ${q.options.map(opt => `<button onclick="checkAnswer('${opt}')">${opt}</button>`).join("")}
    `;
  } else {
    quizContainer.innerHTML = `<h3>Quiz Finished! 🎉 Your Score: ${score}/${quizData.length}</h3>`;
  }
}

function checkAnswer(selected) {
  if (selected === quizData[currentQuestion].answer) {
    score++;
    alert("✅ Correct!");
  } else {
    alert("❌ Wrong! The correct answer is " + quizData[currentQuestion].answer);
  }
  currentQuestion++;
  loadQuiz();
}

loadQuiz();

