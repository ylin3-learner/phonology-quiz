let currentQuestionIndex = 0;
let score = 0;
let questions = [];

function startQuiz() {
    const selectedQuiz = document.getElementById('quiz-topic').value;
    if (selectedQuiz) {
        resetQuiz();
        const script = document.createElement('script');
        script.src = selectedQuiz;
        script.onload = () => {
            currentQuestionIndex = 0;
            score = 0;
            document.getElementById('quiz-container').style.display = 'block';
            document.getElementById('start-quiz-btn').style.display = 'none';
            document.getElementById('quiz-selection').style.display = 'none';
            document.getElementById('restart-btn').style.display = 'none';
            loadQuestion();
        };
        document.head.appendChild(script);
        document.getElementById('next-btn').style.display = 'none';
        document.getElementById('result').innerText = '';
    } else {
        alert("Please select a quiz topic.");
    }
}

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').innerText = currentQuestion.question;
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';
    currentQuestion.choices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'choice';
        button.innerText = choice;
        button.onclick = () => checkAnswer(choice);
        choicesContainer.appendChild(button);
    });
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('question-counter').innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

function checkAnswer(selectedChoice) {
    const currentQuestion = questions[currentQuestionIndex];
    const resultContainer = document.getElementById('result');
    if (selectedChoice === currentQuestion.correct) {
        score++;
        resultContainer.innerText = 'Correct!';
    } else {
        resultContainer.innerText = `Wrong! The correct answer is: ${currentQuestion.correct}`;
    }
    document.getElementById('next-btn').style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        document.getElementById('result').innerText = '';
    } else {
        showFinalScore();
    }
}

function showFinalScore() {
    document.getElementById('quiz-container').innerHTML = `<h2>Your score: ${score}/${questions.length}</h2>`;
    document.getElementById('result').innerText = '';
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('quiz-selection').style.display = 'block';
    document.getElementById('start-quiz-btn').style.display = 'block';
    document.getElementById('restart-btn').style.display = 'block';
}

function restartQuiz() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('quiz-container').innerHTML = `
        <div id="question"></div>
        <div id="choices"></div>
        <div id="question-counter"></div>
    `;
    document.getElementById('result').innerText = '';
    document.getElementById('quiz-selection').style.display = 'block';
    document.getElementById('start-quiz-btn').style.display = 'block';
    document.getElementById('restart-btn').style.display = 'none';
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    questions = [];
    const oldScript = document.querySelector('script[src="quiz.js"], script[src="grimsLaw.js"]');
    if (oldScript) {
        oldScript.remove();
    }
}
