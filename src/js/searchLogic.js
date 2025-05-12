export default class searchLogic {
  constructor(searchList, currentLocationBtn, searchInput, onCitySelected) {
    this.searchList = searchList;
    this.currentLocationBtn = currentLocationBtn;
    this.searchInput = searchInput;
    this.onCitySelected = onCitySelected;

    let debounceTimer;
    searchInput.addEventListener("input", (e) => {
      const inputValue = e.target.value;

      clearTimeout(debounceTimer);

      if (inputValue !== "") {
        debounceTimer = setTimeout(() => {
          fetch(`/.netlify/functions/fetch-weather?city=${inputValue}`)
            .then((res) => {
              return res.json();
            })
            .then((data) => {

              this.searchList.innerHTML = ``;

              // data = all cities data
              data.forEach((city) => {
                this.generateHtmlList(city);
              });

              this.getSelectedCity();
              
            })
            .catch((err) => console.error("Fetch error:", err));
        }, 400);
      }
    });
  }

  generateHtmlList(city) {
    this.searchList.innerHTML += `
            <li>
              <button class="search__list-item" type="button" data-lat=${city.lat} data-lon=${city.lon}>
                <span class="search__list-icon icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000000"
                  >
                    <path
                      d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"
                    />
                  </svg>
                </span>

                <div>
                  <p class="search__list-title">${city.name}</p>
                  <p class="search__list-desc">${
                    city.state ? city.state + "," : ""
                  } ${city.country}</p>
                </div>
              </button>
            </li>
            `;
  }

  getSelectedCity() {
    const cityBtns = document.querySelectorAll(".search__list-item");
    cityBtns.forEach(button => {
      button.addEventListener('click', () => {
        const lat = button.dataset.lat;
        const lon = button.dataset.lon;
        const cityName = button.querySelector(".search__list-title").textContent;

        const selectedCity = { lat, lon, cityName };

        if (this.onCitySelected) {
          this.onCitySelected(selectedCity);
        }

      });
    })
  }

}
