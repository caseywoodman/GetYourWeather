// GLOBAL VARIABLES
let searchBtn = document.querySelector("#searchBtn");
let citySelect = document.querySelector("#citySelect");
let currentTemp = document.querySelector("#currentTemp");
let currentWind = document.querySelector("#currentWind");
let currentHumidity = document.querySelector("#currentHumidity");
let currentIcon = document.querySelector("#currentIcon");
let forecastDiv = document.querySelector("#forcastDiv");

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
      let date = data.list[0].dt_txt.split(" ");
      let [year, month, day] = date[0].split("-");
      let currentDate = [month, day, year].join("-");
      cityName.innerHTML = `${data.city.name} (${currentDate})`;
      currentTemp.innerHTML = data.list[0].main.temp;
      currentWind.innerHTML = data.list[0].wind.speed;
      currentHumidity.innerHTML = `${data.list[0].main.humidity}%`;
      currentIcon.src = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
      currentIcon.alt = `${data.list[0].weather[0].main} icon`;

      // Five day Forecast
      data.list.forEach((list) => {
        let noon = list.dt_txt.split(" ");
        if (noon[1] === "12:00:00") {
          let [year, month, day] = noon[0].split("-");
          let listDate = [month, day, year].join("-");
          let listIcon = `https://openweathermap.org/img/w/${list.weather[0].icon}.png`;
          let listIconAlt = `${list.weather.main} icon`;
          let listTemp = list.main.temp;
          let listWind = `${list.wind.speed} MPH`;
          let listHumidity = `${list.main.humidity}%`;
          forecastDiv.innerHTML += `<div class="flex flex-col border-2 border-indigo-600 min-w-125 grow items-center"><div class="bg-indigo-600 text-white w-full text-center font-semibold">${listDate}</div><img class="w-16 h-16" src="${listIcon}" alt="${listIconAlt}"></img><div>Temp: ${listTemp}</div><div>Wind: ${listWind}</div><div>Humidity: ${listHumidity}</div></div>`;
        }
      });
    });
}

// EVENT CALLS

// EVENT LISTENERS
init();

// searchBTN event listener
searchBtn.addEventListener("click", citySearch);

// pastSearchBTN event listener
