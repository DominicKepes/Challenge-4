document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.getElementById("start");
  const questionsContainer = document.getElementById("questions");
  const endScreen = document.getElementById("end-screen");
  const timerDisplay = document.getElementById("time");
  const initialsInput = document.getElementById("initials");
  const submitBtn = document.getElementById("submit");

  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 60;
  let timerInterval;

  // Questions array with format { question: "", choices: [], answer: "" }
  // list of all questions, choices, and answers
  const questions = [
    {
      question: 'Inside which HTML element do we put the JavaScript?',
      choices: ['<javascript>', '<js>', '<script>', '<sc>'],
      answer: '<script>',
    },
    {
      question: 'Where is the correct place to insert a JavaScript?',
      choices: ['The <body> section', 'The <head> section'],
      answer: 'The <body> section',
    },
    {
      question: 'Arrays in JavaScript can be used to store ____.',
      choices: [
        'numbers and strings',
        'other arrays',
        'booleans',
        'all of the above',
      ],
      answer: 'all of the above',
    },
    {
      question: 'String values must be enclosed within ____ when being assigned to variables.',
      choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
      answer: 'quotes',
    },
    {
      question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
      choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
      answer: 'console.log',
    },
    {
      question: 'Java and Javascript are the same',
      choices: ['true', 'false'],
      answer: 'false'
    }
  ];


  function startQuiz() {
    startBtn.style.display = "none";
    questionsContainer.classList.remove("hide");
    displayQuestion();
    startTimer();
  }

  function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question-title").textContent = currentQuestion.question;
    const choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = "";
    currentQuestion.choices.forEach(choice => {
      const choiceBtn = document.createElement("button");
      choiceBtn.textContent = choice;
      choiceBtn.classList.add("btn", "btn-primary", "mr-2");
      choiceBtn.addEventListener("click", function () {
        handleAnswer(choice);
      });
      choicesContainer.appendChild(choiceBtn);
    });
  }

  function handleAnswer(choice) {
    const currentQuestion = questions[currentQuestionIndex];
    if (choice === currentQuestion.answer) {
      score++;
      showFeedback("Correct!", "alert-success");
    } else {
      timeLeft -= 10; // Penalty for incorrect answer
      if (timeLeft < 0) timeLeft = 0;
      showFeedback("Wrong!", "alert-danger");
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }

  function startTimer() {
    timerInterval = setInterval(function () {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endQuiz();
      }
      timerDisplay.textContent = timeLeft;
    }, 1000);
  }

  function showFeedback(message, className) {
    const feedback = document.getElementById("feedback");
    feedback.textContent = message;
    feedback.className = "feedback alert " + className;
    feedback.classList.remove("hide");
    setTimeout(function () {
      feedback.classList.add("hide");
    }, 1000);
  }

  function endQuiz() {
    clearInterval(timerInterval);
    questionsContainer.classList.add("hide");
    endScreen.classList.remove("hide");
    document.getElementById("final-score").textContent = score;
  }

  submitBtn.addEventListener("click", function () {
    const initials = initialsInput.value.trim();
    if (initials !== "") {
      // Here you can save initials and score
      console.log("Initials:", initials);
      console.log("Score:", score);
      // Example: localStorage.setItem("highscore", score);
      // Example: localStorage.setItem("initials", initials);
      // Then redirect or show high scores
    }
  });

  startBtn.addEventListener("click", startQuiz);
});
