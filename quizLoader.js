let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let timer;
let clockSound;

function startQuiz() {
    const selectedQuiz = document.getElementById('quiz-topic').value;
    const quizTime = parseInt(document.getElementById('quiz-time').value);

    if (selectedQuiz && quizTime > 0) {
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
            startTimer(quizTime * 60);  // Convert minutes to seconds
            loadQuestion();
            document.addEventListener('visibilitychange', handleVisibilityChange);
        };
        document.head.appendChild(script);
        document.getElementById('next-btn').style.display = 'none';
        document.getElementById('result').innerText = '';
        clockSound = new Audio('clock.mp3');
    } else {
        alert("Please select a quiz topic and set a valid time.");
    }
}

function startTimer(seconds) {
    const timerDisplay = document.getElementById('timer');
    const endTime = Date.now() + seconds * 1000;

    displayTimeLeft(seconds);

    timer = setInterval(() => {
        const secondsLeft = Math.round((endTime - Date.now()) / 1000);

        if (secondsLeft < 0) {
            clearInterval(timer);
            clockSound.pause();
            showFinalScore();
            return;
        }

        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = display;

    if (seconds <= 60) {
        timerDisplay.style.color = 'red';
        if (!timerDisplay.classList.contains('last-minute')) {
            timerDisplay.classList.add('last-minute');
            clockSound.play();
        }
    } else {
        timerDisplay.style.color = 'black';
        timerDisplay.classList.remove('last-minute');
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
        resultContainer.style.color = 'green';
    } else {
        resultContainer.innerText = `Wrong! The correct answer is: ${currentQuestion.correct}`;
        resultContainer.style.color = 'red';
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
    clearInterval(timer);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    clockSound.pause();
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
        <div id="timer"></div>
        <div id="question"></div>
        <div id="choices"></div>
        <div id="question-counter"></div>
    `;
    document.getElementById('result').innerText = '';
    document.getElementById('quiz-selection').style.display = 'block';
    document.getElementById('start-quiz-btn').style.display = 'block';
    document.getElementById('restart-btn').style.display = 'none';
    clockSound.pause();
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    questions = [];
    clearInterval(timer);
    if (clockSound) {
        clockSound.pause();
        clockSound.currentTime = 0;
    }
    const oldScript = document.querySelector('script[src="quiz.js"], script[src="grimsLaw.js"]');
    if (oldScript) {
        oldScript.remove();
    }
}

function handleVisibilityChange() {
    if (document.hidden) {
        const alertSound = document.getElementById('alert-sound');
        alertSound.play();
        alert("You have navigated away from the quiz. This is considered cheating.");
        showFinalScore();
    }
}
