import searchLogic from "./searchLogic.js";
import generateHTML from "./generateHTML.js";

export default class App {
  constructor() {
    const searchInput = document.querySelector(".search__view input");
    const searchContainer = document.querySelector(".search__view");
    const currentLocationBtn = document.getElementById("currentLocationBtn");
    const searchList = document.querySelector(".search__list");

    this.headerLogic(searchInput, searchContainer, searchList);

    const search = new searchLogic(searchList, currentLocationBtn, searchInput, (selectedCity) => {
      const { lat, lon, cityName } = selectedCity;

    fetch(`/.netlify/functions/fetch-weather?lat=${lat}&lon=${lon}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const { current, forecast } = data;
          const getHTML = new generateHTML(current, forecast);
        });
    });

  }

  headerLogic(searchInput, searchContainer, searchList) {
    searchInput.addEventListener("input", (e) => {
      const inputValue = e.target.value.toLowerCase();

      if (inputValue) {
        searchContainer.style.borderRadius = "1rem 1rem 0 0";
        searchList.classList.remove("invisible");
      } else {
        searchContainer.style.borderRadius = "3rem";
        searchList.classList.add("invisible");
      }
    });

    searchInput.addEventListener("blur", () => {
      setTimeout(() => {
        searchList.classList.add("invisible");
        searchContainer.style.borderRadius = "3rem";
      }, 200);
    });
  }
}
