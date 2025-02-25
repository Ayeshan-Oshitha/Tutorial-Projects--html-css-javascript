const questions = [
  {
    question: "Which is largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which is the smallest country in the world?",
    answers: [
      { text: "Vatican City", correct: true },
      { text: "Bhutan", correct: false },
      { text: "Nepal", correct: false },
      { text: "India", correct: false },
    ],
  },
  {
    question: "Which is the largest dessert in the world?",
    answers: [
      { text: "Kalahari", correct: false },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: true },
      { text: "Antarctica", correct: false },
    ],
  },
  {
    question: "Which is the samllest continent in the world?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Arctic", correct: false },
      { text: "Africa", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex]; // select question from array
  let questionNo = currentQuestionIndex + 1; // calculate the question No
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question; // Display the Question in webpage

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button"); // creat a button
    button.innerHTML = answer.text; // set the answer as a button text
    button.classList.add("btn"); // add "btn" classname for button
    answerButtons.appendChild(button); // add created button inside "answer-button" div
    if (answer.correct) {
      button.dataset.correct = answer.correct; // add correct status to the button ( from the answer array )
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none"; // hide next button
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild); // clear previosus answewrs
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct"); // executes when user clicks on correct answer
    score++;
  } else {
    selectedBtn.classList.add("incorrect"); // executes when user clicks on wrong answer
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct"); // If user clicks on Wrong answer, Then It should display the correct answer from other remaining answers.
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}. `;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
