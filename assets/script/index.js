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
