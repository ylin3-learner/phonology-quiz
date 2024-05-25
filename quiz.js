const quizData = {
    "Phonemes and Allophones": {
        "Phonemes": {
            "Definition": "Phonemes are the smallest units of sound in a language that can distinguish words.",
            "Examples": {
                "pear": "/pɛr/",
                "bear": "/bɛr/"
            },
            "Notation": "Use slashes, e.g., /p/, /b/"
        },
        "Allophones": {
            "Definition": "Allophones are variations of a phoneme that occur in different phonetic environments.",
            "Examples": {
                "pat": "[pʰæt]",
                "spat": "[spæt]"
            },
            "Notation": "Use square brackets, e.g., [pʰ] and [p]"
        }
    },
    "Places of Articulation": {
        "Bilabial": {
            "Definition": "Sounds produced with both lips.",
            "Examples": {
                "pat": "/p/",
                "bat": "/b/",
                "mat": "/m/"
            }
        },
        "Dental": {
            "Definition": "Sounds produced with the tongue against the upper teeth.",
            "Examples": {
                "think": "/θ/",
                "this": "/ð/"
            }
        },
        "Alveolar": {
            "Definition": "Sounds produced with the tongue against the alveolar ridge.",
            "Examples": {
                "tap": "/t/",
                "dad": "/d/",
                "sit": "/s/",
                "zoo": "/z/"
            }
        },
        "Palatal": {
            "Definition": "Sounds produced with the tongue against the hard palate.",
            "Examples": {
                "yes": "/j/"
            }
        },
        "Velar": {
            "Definition": "Sounds produced with the back of the tongue against the soft palate.",
            "Examples": {
                "cat": "/k/",
                "go": "/g/",
                "sing": "/ŋ/"
            }
        }
    },
    "Manners of Articulation": {
        "Stops": {
            "Definition": "Sounds produced by completely blocking and then releasing the airflow.",
            "Examples": {
                "pat": "/p/",
                "bat": "/b/",
                "tap": "/t/",
                "dad": "/d/",
                "cat": "/k/",
                "go": "/g/"
            }
        },
        "Fricatives": {
            "Definition": "Sounds produced by partially blocking the airflow.",
            "Examples": {
                "fat": "/f/",
                "vat": "/v/",
                "think": "/θ/",
                "this": "/ð/",
                "sit": "/s/",
                "zoo": "/z/",
                "she": "/ʃ/",
                "measure": "/ʒ/"
            }
        },
        "Affricates": {
            "Definition": "Sounds produced by a stop followed by a fricative.",
            "Examples": {
                "chop": "/tʃ/",
                "jump": "/dʒ/"
            }
        },
        "Nasals": {
            "Definition": "Sounds produced with airflow through the nose.",
            "Examples": {
                "mat": "/m/",
                "nap": "/n/",
                "sing": "/ŋ/"
            }
        },
        "Liquids": {
            "Definition": "Sounds that are produced with a relatively open vocal tract.",
            "Examples": {
                "lip": "/l/",
                "rip": "/r/"
            }
        },
        "Glides": {
            "Definition": "Sounds that are produced with a gliding motion to or from a vowel.",
            "Examples": {
                "yes": "/j/",
                "we": "/w/"
            }
        }
    },
    "Vowels and Diphthongs": {
        "Vowel Classification": {
            "Height": {
                "High": {
                    "Examples": "see: /i/"
                },
                "Low": {
                    "Examples": "cat: /æ/"
                }
            },
            "Tongue Position": {
                "Front": {
                    "Examples": "see: /i/"
                },
                "Back": {
                    "Examples": "blue: /u/"
                }
            },
            "Lip Rounding": {
                "Rounded": {
                    "Examples": "blue: /u/"
                },
                "Unrounded": {
                    "Examples": "see: /i/"
                }
            },
            "Tenseness": {
                "Tense": {
                    "Examples": "see: /i/"
                },
                "Lax": {
                    "Examples": "sit: /ɪ/"
                }
            }
        },
        "Diphthongs": {
            "Definition": "Vowels that change quality within the same syllable.",
            "Examples": {
                "eye": "/aɪ/",
                "cow": "/aʊ/",
                "boy": "/ɔɪ/"
            }
        }
    }
};

const questions = [
    {
        question: "What are the smallest units of sound that can distinguish words?",
        choices: ["Phonemes", "Allophones", "Bilabial Sounds", "Stops"],
        correct: "Phonemes"
    },
    {
        question: "What are variations of a phoneme that occur in different phonetic environments?",
        choices: ["Phonemes", "Allophones", "Nasals", "Fricatives"],
        correct: "Allophones"
    },
    {
        question: "Sounds produced with both lips are called?",
        choices: ["Dental", "Alveolar", "Bilabial", "Palatal"],
        correct: "Bilabial"
    },
    {
        question: "Sounds produced by completely blocking and then releasing the airflow are called?",
        choices: ["Stops", "Fricatives", "Affricates", "Nasals"],
        correct: "Stops"
    },
    {
        question: "What is an example of a high vowel?",
        choices: ["/i/ as in see", "/æ/ as in cat", "/u/ as in blue", "/ɪ/ as in sit"],
        correct: "/i/ as in see"
    },
    {
        question: "Give an example of a dental sound.",
        choices: ["/p/ as in pat", "/θ/ as in think", "/t/ as in tap", "/m/ as in mat"],
        correct: "/θ/ as in think"
    },
    {
        question: "Which of the following is a fricative?",
        choices: ["/f/ as in fat", "/b/ as in bat", "/k/ as in cat", "/p/ as in pat"],
        correct: "/f/ as in fat"
    },
    {
        question: "Which sound is produced with the back of the tongue against the soft palate?",
        choices: ["/k/ as in cat", "/t/ as in tap", "/m/ as in mat", "/f/ as in fat"],
        correct: "/k/ as in cat"
    },
    {
        question: "What is an example of a diphthong?",
        choices: ["/aɪ/ as in eye", "/i/ as in see", "/æ/ as in cat", "/u/ as in blue"],
        correct: "/aɪ/ as in eye"
    },
    {
        question: "Sounds produced with a relatively open vocal tract are called?",
        choices: ["Stops", "Liquids", "Nasals", "Fricatives"],
        correct: "Liquids"
    }
    // Add more questions here as needed
];

let currentQuestionIndex = 0;
let score = 0;

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
}

// Initialize the first question
loadQuestion();
