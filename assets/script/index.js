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
      domande += `<input id="answer${q}" type="radio" name="options" value="answer${q}" />
          <label for="answer${q}">${answers[q]}</label>`;
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

const nextQuestion = () => {
  switch (true) {
    case activeQuestion < 0:
      activeQuestion += 1;
      console.log(activeQuestion);
      document
        .querySelector(`#domanda${activeQuestion}`)
        .classList.remove("hidden");
      console.log(activeQuestion);
      break;
    case activeQuestion >= 0 && activeQuestion < questions.length - 1:
      document
        .querySelector(`#domanda${activeQuestion}`)
        .classList.add("hidden");
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
      addResponseToArray(activeQuestion);
      showResults();
      break;
  }

  //AZZERARE IL TIMER E MOSTRARE LA NUOVA DOMANDA
};

const showResults = () => {
  console.log(arrayRisposte);
  document.getElementById("results").classList.remove("hidden");
};

const addResponseToArray = (indice) => {
  arrayRisposte[indice] = document.querySelector(
    `#question${indice} input[type="radio"]:checked + label `
  ).innerHTML;
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
