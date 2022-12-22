const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];
const arrayRisposte = [];

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

for (let i = 0; i < questions.length; i++) {
  questions[i].answers = [...questions[i].incorrect_answers];
  questions[i].answers.push(questions[i].correct_answer);
  shuffle(questions[i].answers);
}
console.log(questions);

const startQuestions = () => {
  const verificaSpunta = document.querySelector("#checkb").checked;
  if (verificaSpunta === true) {
    document.querySelector("#welcome").classList.add("hidden");
    loadQuestions(questions);
  } else {
    alert(
      "You must confirm that you'll answer yourself without help from anyone."
    );
  }
};

let activeQuestion = -1;

const loadQuestions = (questionsArray) => {
  const questionsSection = document.querySelector("#questions");
  for (let i = 0; i < questionsArray.length; i++) {
    let domande = `<div id="domanda${i}" class="hidden">
      <h1>${questionsArray[i].question}</h1>
      <form id="question${i}">
        <div class="radio-container">`;

    let answers = questionsArray[i].answers;

    for (let q = 0; q < answers.length; q++) {
      domande += `<input id="answer${i}_${q}" type="radio" name="options" value="answer${q}" />
          <label for="answer${i}_${q}">${answers[q]}</label>`;
    }

    domande += `</div>
        <div id="question-footer">
          <h3>QUESTION ${i + 1} <span>/${questionsArray.length}</span></h3>
          <a onclick="nextQuestion()"><ion-icon name="arrow-forward-outline" class="arrow"></ion-icon></a>
        </div>
      </form>
    </div>`;

    questionsSection.innerHTML += domande;
    document.querySelector("#questions").classList.remove("hidden");
  }
  nextQuestion();
};

// **************************************** TIMER *********************************************** //
// Start with an initial value of 20 seconds
const TIME_LIMIT = 30;

// Initially, no time has passed, but this will count up
// and subtract from the TIME_LIMIT
let timePassed = 0;
let timeLeft = TIME_LIMIT;

function formatTimeLeft(time) {
  // The largest round integer less than or equal to the result of time divided being by 60.
  const minutes = Math.floor(time / 60);
  // Seconds are the remainder of the time divided by 60 (modulus operator)
  let seconds = time % 60;

  // If the value of seconds is less than 10, then display seconds with a leading zero
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  // The output in MM:SS format
  return `${seconds}`;
}

let timerInterval = null;

document.getElementById("app").innerHTML = `...`;

function startTimer() {
  timerInterval = setInterval(() => {
    // The amount of time passed increments by one
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    if (timeLeft <= 0) {
      nextQuestion();
    }

    // The time left label is updated
    document.getElementById("base-timer-label").innerHTML =
      formatTimeLeft(timeLeft);
    setCircleDasharray();
  }, 1000);
}

function resetTimer() {
  timePassed = 0;
  setRemainingPathColor(timeLeft);
}

function stopTimer() {
  timeLeft = TIME_LIMIT;
  clearInterval(timerInterval);
}

// Warning occurs at 10s
const WARNING_THRESHOLD = 15;
// Alert occurs at 5s
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};

let remainingPathColor = COLOR_CODES.info.color;
// Divides time left by the defined time limit.
function calculateTimeFraction() {
  setRemainingPathColor(timeLeft);
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

// Update the dasharray value as time passes, starting with 283
function setCircleDasharray() {
  const circleDasharray = `${(calculateTimeFraction() * 283).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;

  // If the remaining time is less than or equal to 5, remove the "warning" class and apply the "alert" class.
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);

    // If the remaining time is less than or equal to 10, remove the base color and apply the "warning" class.
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283 283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
      </g>
      </svg><span style="font-size: 8px; margin-top: -24px;"class="base-timer__label">SECONDS</span><br>
      <span id="base-timer-label" class="base-timer__label">
      ${formatTimeLeft(timeLeft)}
      </span ><br><span style="font-size: 8px; margin-top: 24px;"class="base-timer__label">REMAINING</span>
      </div>
      `;

// **************************************** FINE TIMER ***********************************************

const nextQuestion = () => {
  switch (true) {
    case activeQuestion < 0:
      activeQuestion += 1;
      console.log(activeQuestion);
      document
        .querySelector(`#domanda${activeQuestion}`)
        .classList.remove("hidden");
      document.querySelector(`#app`).classList.remove("hidden");
      startTimer();
      break;
    case activeQuestion >= 0 && activeQuestion < questions.length - 1:
      document
        .querySelector(`#domanda${activeQuestion}`)
        .classList.add("hidden");
      resetTimer();
      addResponseToArray(activeQuestion);
      activeQuestion++;
      document
        .querySelector(`#domanda${activeQuestion}`)
        .classList.remove("hidden");
      break;
    default:
      document
        .querySelector(`#domanda${activeQuestion}`)
        .classList.add("hidden");
      document.querySelector(`#app`).classList.add("hidden");
      addResponseToArray(activeQuestion);
      stopTimer();
      showResults();
      break;
  }

  //AZZERARE IL TIMER E MOSTRARE LA NUOVA DOMANDA
};

const showResults = () => {
  punteggio();
  drawChart();
  listAnswers();
  document.getElementById("results").classList.remove("hidden");
};

const addResponseToArray = (indice) => {
  let risposta = document.querySelector(
    `#question${indice} input[type="radio"]:checked + label `
  );
  if (risposta !== null) {
    arrayRisposte[indice] = risposta.innerHTML;
  } else {
    arrayRisposte[indice] = "N/A";
  }
};

const punteggio = () => {
  const domandeTotali = questions.length;
  let risposteCorrette = 0;
  let risposteErrate = 0;
  for (let index = 0; index < questions.length; index++) {
    if (questions[index].correct_answer === arrayRisposte[index]) {
      risposteCorrette += 1;
    } else {
      risposteErrate += 1;
    }
  }
  const percentualeCorrette = (risposteCorrette * 100) / domandeTotali;
  const percentualeErrate = 100 - percentualeCorrette;
  return {
    domandeTotali,
    risposteCorrette,
    risposteErrate,
    percentualeCorrette,
    percentualeErrate,
  };
};

const drawChart = () => {
  const risultati = punteggio();
  if (risultati.percentualeCorrette >= 60) {
    innergraphic = `Congratulations! <br />You passed the exam. <br />We'll send you the
            certificate in few minutes. <br />
            Check your email (including promotions / spam folder)`;
  } else {
    innergraphic = `Too bad, <br />you didn't pass the exam. <br />Contact your teaching assistant!<br />
          `;
  }
  console.log(innergraphic);
  const disegnaRisultati = `<div>
          <h2>Correct</h2>
          <h2>${risultati.percentualeCorrette}%</h2>
          <p>${risultati.risposteCorrette}/${
    risultati.domandeTotali
  } questions</p>
        </div>

        <div class="single-chart">
          <svg viewBox="0 0 36 36" class="circular-chart color">
            <path
              class="circle-bg"
              d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              class="circle"
              stroke-dasharray="${Math.floor(
                risultati.percentualeCorrette
              )}, 100"
              d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div class="innergraphic">
            ${innergraphic}
          </div>
        </div>

        <div class="align-right">
          <h2>Wrong</h2>
          <h2>${risultati.percentualeErrate}%</h2>
          <p>${risultati.risposteErrate}/${
    risultati.domandeTotali
  } questions</p>
        </div>`;
  const chartSection = document.querySelector("#chart-section");
  chartSection.innerHTML = disegnaRisultati;
};

const listAnswers = () => {
  let schedaRisposte = "";
  for (let q = 0; q < questions.length; q++) {
    if (arrayRisposte[q] === questions[q].correct_answer) {
      rispostadata = `<ion-icon name="close-outline" style="color: green;"></ion-icon>${arrayRisposte[q]}`;
    } else if (arrayRisposte[q] === "N/A") {
      rispostadata = `<ion-icon name="close-outline" style= "color: red;"></ion-icon>${arrayRisposte[q]}`;
    } else {
      rispostadata = `<ion-icon name="close-outline" style= "color: red;"></ion-icon>${arrayRisposte[q]}`;
    }
    schedaRisposte += `<div id="answer${q}" class="answer">
            <div>
              <h6>${questions[q].question}</h6>
              <ul>
                <li><ion-icon name="close-outline" style="color: green;"></ion-icon>${questions[q].correct_answer}</li>`;
    for (let ia = 0; ia < questions[q].incorrect_answers.length; ia++) {
      schedaRisposte += `<li><ion-icon name="close-outline" style= "color: red;"></ion-icon>${questions[q].incorrect_answers[ia]}</li>`;
    }
    schedaRisposte += `
              </ul>
            </div>
            <div>
              <h6>La tua risposta:</h6>
              <p>${rispostadata}</p>
            </div>
          </div>`;
  }
  const sezioneRisposte = document.querySelector(".answers");
  sezioneRisposte.innerHTML = schedaRisposte;
};

const rateUs = () => {
  document.querySelector("#results").classList.add("hidden");
  document.querySelector("#feedback").classList.remove("hidden");
};

const feedbackSection = document.querySelector("#fieldsetFeedback");
const stelle = 10;
for (let i = 0; i < stelle; i++) {
  const formStelle = ` <p class="feedbackrating">
          <input id="feedback${i}" type="radio" value="${i}" name="feedback" />
          <label for="feedback${i}">
            <img src="./assets/imgs/star.svg" onclick="selectFb(${i})" id="fbImg${i}"alt="${i}" /></label>
        </p>`;

  feedbackSection.innerHTML += formStelle;
}

const selectFb = (id) => {
  const stelleFeed = document.querySelectorAll(".feedbackrating img");
  for (let i = 0; i < stelleFeed.length; i++) {
    stelleFeed[i].classList.remove("stars_col");
  }
  for (let i = 0; i < id + 1; i++) {
    stelleFeed[i].classList.add("stars_col");
  }
};

const sendFeedback = () => {
  const feedbackText = document.getElementById("comment").value;
  const feedbackValue = document.querySelector(
    ".feedbackrating input[type='radio']:checked"
  );
  if (feedbackValue !== null) {
    console.log({ feedbackValue: feedbackValue.value, feedbackText });
  } else {
    alert("You've not given a rating! Nothing to send.");
  }
};
