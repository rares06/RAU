const questions = [
    {
      question: 'Care a fost primul împărat al Imperiului Roman?',
      options: ['Iulius Cezar', 'Augustus', 'Nero', 'Niciuna'],
      correctAnswer: 'Augustus'
    },
    {
      question: 'Ce gaz este cel mai abundent în atmosfera Pământului?',
      options: ['Oxigen', 'Azot', 'Dioxid de carbon', 'Gaz metan'],
      correctAnswer: 'Azot'
    },
    {
      question: 'Care este cel mai lung fluviu din lume?',
      options: ['Delta Dunarii', 'Nil', 'Dambovita', 'Amazonul'],
      correctAnswer: 'Nil'
    },
    {
      question: 'Cine este fondatorul companiei Microsoft?',
      options: ['Steve Jobs', 'Elon Musk', 'Bill Gates', 'Pescobar'],
      correctAnswer: 'Bil Gates'
    },
    {
      question: 'Cine a scris romanul "Moby-Dick"??',
      options: ['Mihai Eminescu', 'Herman Melville', 'Mark Twain', 'Charles Dickens'],
      correctAnswer: 'Herman Melville'
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function displayQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const scoreElement = document.getElementById('score');
    const currentQuestion = questions[currentQuestionIndex];
  
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';
  
    currentQuestion.options.forEach((option, index) => {
      const optionButton = document.createElement('button');
      optionButton.className = 'option';
      optionButton.textContent = option;
      optionButton.addEventListener('click', function () {
        checkAnswer(option);
      });
      optionsElement.appendChild(optionButton);
    });
  
    scoreElement.textContent = `Score: ${score}`;
  }
  
  function checkAnswer(selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
  
    if (selectedAnswer === currentQuestion.correctAnswer) {
      score++;
    }
  
    currentQuestionIndex++;
  
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      endGame();
    }
  }
  
  function endGame() {
    alert(`Game over! Your final score is: ${score}`);
    resetGame();
  }
  
  function resetGame() {
    currentQuestionIndex = 0;
    score = 0;
    displayQuestion();
  }
  
  // Start the game
  displayQuestion();
  