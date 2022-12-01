// GLOBAL VARIABLES
let searchBtn = document.querySelector("#searchBtn");
let citySelect = document.querySelector("#citySelect");
let currentTemp = document.querySelector("#currentTemp");
let currentWind = document.querySelector("#currentWind");
let currentHumidity = document.querySelector("#currentHumidity");
let currentIcon = document.querySelector("#currentIcon");
let forcastDiv = document.querySelector("#forcastDiv");

let cityName = document.querySelector("#cityName");

let appId = "c1a401c2171b4a3ca3969046ad42c547";
// divs on the side of the HTML

// FUNCTIONS
function init() {
  // grab last search results from local storage, place on left side of page
  // If nothing in local storage display none
}

//
function citySearch() {
  // Set City to change with the .val of the text input box
  let requestUrl = `https://api.openweathermap.org/data/2.5/forecast/?q=${citySelect.value}&units=imperial&appid=${appId}`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      cityName.innerHTML = `${data.city.name} (${data.list[0].dt_txt})`;
      currentTemp.innerHTML = data.list[0].main.temp;
      currentWind.innerHTML = data.list[0].wind.speed;
      currentHumidity.innerHTML = `${data.list[0].main.humidity}%`;
      currentIcon.src = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
      currentIcon.alt = `${data.list[0].weather[0].main} icon`;
    });
}

// EVENT CALLS

// EVENT LISTENERS
init();

// searchBTN event listener
searchBtn.addEventListener("click", citySearch);

// pastSearchBTN event listener
