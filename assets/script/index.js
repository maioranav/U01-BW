const feedbackSection = document.querySelector("#fieldesetFeedback");
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
  document.querySelector(`#fbImg${id}`).classList.toggle("stars_col");
  console.log("cambio");
};
