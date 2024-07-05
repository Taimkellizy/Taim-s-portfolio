// Define the questions and answers as an array of objects
var questions = [
    {
      question: "What is the output of the following code snippet in Python?\n\nx = 10\ny = 20\nx, y = y, x\nprint(x, y)",
      choices: ["10 20", "20 10", "SyntaxError", "None of the above"],
      answer: 1 // The index of the correct choice
    },
    {
      question: "What is the correct way to declare a variable named `age` with the value `25` in JavaScript?",
      choices: ["var age = 25;", "int age = 25;", "age = 25;", "let age = 25;"],
      answer: 0 // or 3
    },
    {
      question: "What is the name of the method that is used to add an element to the end of an array in JavaScript?",
      choices: ["push()", "append()", "insert()", "add()"],
      answer: 0
    },
    {
      question: "What is the result of evaluating the expression `3 ** 2` in C++?",
      choices: ["6", "9", "SyntaxError", "None of the above"],
      answer: 2
    },
    {
      question: "What is the name of the built-in function that returns the length of a string in Python?",
      choices: ["len()", "size()", "length()", "strlen()"],
      answer: 0
    }
  ];

  // Define some variables to store the quiz state
  var currentQuestion = 0; // The index of the current question
  var score = 0; // The number of correct answers
  var quizOver = false; // A flag to indicate if the quiz is over

  // Get references to some HTML elements that we will use
  var quizContainer = document.getElementById("quiz"); // The container for the quiz
  var questionElement = document.getElementById("question"); // The element to display the question
  var choiceElements = document.getElementById("choices").children; // The elements to display the choices
  var nextButton = document.getElementById("nextButton"); // The button to go to the next question
  var resultElement = document.getElementById("result"); // The element to display the result

  // Display the first question
  displayCurrentQuestion();

  // Add a click event listener to the next button
  nextButton.addEventListener("click", function() {
    // If the quiz is over, do nothing
    if (quizOver) {
      return;
    }

    // Get the selected choice from the list items
    var selectedChoice = -1; // A variable to store the index of the selected choice
    for (var i = 0; i < choiceElements.length; i++) {
      if (choiceElements[i].classList.contains("selected")) {
        selectedChoice = parseInt(choiceElements[i].dataset.index);
        break;
      }
    }

    // If no choice is selected, alert the user and return
    if (selectedChoice == -1) {
      alert("Please select an answer!");
      return;
    }

    // If the selected choice is correct, increment the score
    if (selectedChoice == questions[currentQuestion].answer) {
      score++;
    }

    // Clear the result element
    resultElement.innerHTML = "";

    // Increment the current question index
    currentQuestion++;

    // If there are no more questions, end the quiz and display the score
    if (currentQuestion == questions.length) {
      endQuiz();
    } else {
      // Otherwise, display the next question
      displayCurrentQuestion();
    }
  });

  // Add a click event listener to each choice element
  for (var i = 0; i < choiceElements.length; i++) {
    choiceElements[i].addEventListener("click", function() {
      // Remove the selected class from any other choice element
      for (var j = 0; j < choiceElements.length; j++) {
        choiceElements[j].classList.remove("selected");
      }
      // Add the selected class to the clicked choice element
      this.classList.add("selected");
    });
  }

  // A function to display the current question and choices
  function displayCurrentQuestion() {
    // Get the current question object from the array
    var question = questions[currentQuestion];

    // Set the question element text to the question text
    questionElement.textContent = question.question;

    // Loop through the choice elements and set their text to the corresponding choice text
    for (var i = 0; i < choiceElements.length; i++) {
      choiceElements[i].textContent = question.choices[i];
      // Remove any previous selection
      choiceElements[i].classList.remove("selected");
    }
  }

  // A function to end the quiz and display the score
  function endQuiz() {
    // Set the quiz over flag to true
    quizOver = true;

    // Hide the quiz container and next button
    quizContainer.style.display = "none";
    nextButton.style.display = "none";

    // Show the result element and display the score
    resultElement.style.display = "block";
    resultElement.innerHTML = "<h2>You scored " + score + " out of " + questions.length + "!</h2>";
  }
