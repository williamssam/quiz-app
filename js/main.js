import questions from './questions.js'

// dom elements
const quizContainer = document.getElementById('quiz-section')
const nextBtn = document.getElementById('next')
const submitBtn = document.getElementById('submit')
const progressBar = document.getElementById('progress-bar')
const btnContainer = document.getElementById('btn-container')
const quiz = document.getElementById('questions')
// const prevBtn = document.getElementById('prev');

// initial values
let currentQuiz = 0
let score = 0
progressBar.max = questions.length - 1 // change the maxmimum value of progressbar

// render quiz questions to the dom
const renderQuiz = () => {
    const { question, optionA, optionB, optionC, optionD } =
        questions[currentQuiz]

    quizContainer.innerHTML = `
        <header class="header">
            <h2 id="subtitle"><span>Question ${currentQuiz + 1}</span> (${
        questions.length - (currentQuiz + 1)
    } remaining)</h2>
            <h1 id="question">
                ${question}
            </h1>
        </header>

        <article>
            <div>
                <input type="radio" name="radio" id="option-one" class="radio" data-option="a"/>
                <label for="option-one"
                    ><strong>A.</strong> ${optionA}</label
                >
            </div>
            <div>
                <input type="radio" name="radio" id="option-two" class="radio" data-option="b"/>
                <label for="option-two"
                    ><strong>B.</strong> ${optionB}</label
                >
            </div>
            <div>
                <input
                    type="radio"
                    name="radio"
                    id="option-three"
                    class="radio"
                    data-option="c"
                />
                <label for="option-three"
                    ><strong>C.</strong> ${optionC}</label
                >
            </div>
            <div>
                <input type="radio" name="radio" id="option-four" class="radio" data-option="d"/>
                <label for="option-four"
                    ><strong>D.</strong> ${optionD}</label
                >
            </div>
        </article>
        `

    if (currentQuiz === questions.length - 1) {
        nextBtn.classList.add('hide-btn')
        submitBtn.classList.remove('hide-btn')
    } else {
        nextBtn.classList.remove('hide-btn')
        submitBtn.classList.add('hide-btn')
    }

    /* if (currentQuiz === 0) {
        prevBtn.classList.add('hide-btn');
    } else {
        prevBtn.classList.remove('hide-btn');
    } */
}

const getQuizOptions = (e) => {
    if (!e.target.classList.contains('radio')) return
    const options = quizContainer.querySelectorAll('input[type="radio"]')

    const newArr = Array.from(options)

    isChecked(newArr)
}

// check which radio element is
const isChecked = (newArr) => {
    newArr.forEach((option) => {
        let chosenAnswer = option.checked

        if (chosenAnswer) {
            let userAnswer = option.dataset.option
            let correctAns = questions[currentQuiz].correctAnswer

            // console.log({ userAnswer, correctAns });

            if (userAnswer === correctAns) {
                score++
            }
        }
    })
}

// event listeners
quizContainer.addEventListener('click', getQuizOptions)

nextBtn.addEventListener('click', () => {
    currentQuiz++

    if (currentQuiz >= questions.length) {
        currentQuiz = questions.length - 1
    }

    progressBar.value = currentQuiz
    renderQuiz()
})

submitBtn.addEventListener('click', () => {
    quiz.innerHTML = `
        <div class="score-div">
            <img
                src="./finish-line.svg"
            />

            <div class="score-text">
                <h3>Well Done!!!</h3>
                <h1>Your score is ${score}/${questions.length}</h1>
            </div>
        </div>
    `

    btnContainer.innerHTML = `<button type="button" class="btn" onclick="location.reload()">Restart Quiz</button>`

    console.log(`Your score is ${score}`)
})

// render quiz when dom is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    renderQuiz()
})

/* prevBtn.addEventListener('click', () => {
    currentQuiz--;

    if (currentQuiz < 0) {
        currentQuiz = 0;
    }

    progressBar.value = currentQuiz;

    renderQuiz();
}); */
