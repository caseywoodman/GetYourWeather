// GLOBAL VARIABLES
let searchBtn = document.querySelector("#searchBtn");
let citySelect = document.querySelector("#citySelect");
let currentTemp = document.querySelector("#currentTemp");
let currentWind = document.querySelector("#currentWind");
let currentHumidity = document.querySelector("#currentHumidity");
let currentIcon = document.querySelector("#currentIcon");
let forecastDiv = document.querySelector("#forcastDiv");
let searchAreaDiv = document.querySelector("#searchAreaDiv");
let cityName = document.querySelector("#cityName");
let fiveDayDiv = document.querySelector("#fiveDayDiv");

let appId = "c1a401c2171b4a3ca3969046ad42c547";
let pastSearch = [];
let cityToSearch = citySelect.value;
// let pastSearchBtnClick = document.getElementsByName("cityButton");
// divs on the side of the HTML

// FUNCTIONS
function init() {
  // grab last search results from local storage, place on left side of page
  pastSearch = JSON.parse(localStorage.getItem("citySearch")) || [];
  searchAreaDiv.innerHTML = "";
  pastSearch.forEach((search) => {
    let pastSearchBtn = document.createElement("button");
    pastSearchBtn.textContent = search.toUpperCase();
    pastSearchBtn.setAttribute("class", "bg-[#0197f6] w-full p-4 text-white font-bold");
    pastSearchBtn.setAttribute("id", "pastSearchBtn");
    pastSearchBtn.setAttribute("name", "cityButton");
    pastSearchBtn.setAttribute("city", search.toUpperCase());
    pastSearchBtn.addEventListener("click", pastSearchFunction);
    searchAreaDiv.appendChild(pastSearchBtn);
  });
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
      // Clear Previous Information
      forecastDiv.innerHTML = "";

      let date = data.list[0].dt_txt.split(" ");
      let [year, month, day] = date[0].split("-");
      let currentDate = [month, day, year].join("-");
      cityName.innerHTML = `${data.city.name} (${currentDate})`;
      currentTemp.innerHTML = `TEMP: ${data.list[0].main.temp}`;
      currentWind.innerHTML = `WIND: ${data.list[0].wind.speed}`;
      currentHumidity.innerHTML = `HUMIDITY: ${data.list[0].main.humidity}%`;
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
          fiveDayDiv.setAttribute("class", "w-100 p-4 flex justify-between bg-[#02182B] text-white");
          forecastDiv.innerHTML += `<div class="flex flex-col border-2 border-[#0197f6] min-w-125 grow items-center bg-white"><div class="bg-[#0197f6] text-white w-full text-center font-semibold">${listDate}</div><img class="w-16 h-16" src="${listIcon}" alt="${listIconAlt}"></img><div>Temp: ${listTemp}</div><div>Wind: ${listWind}</div><div>Humidity: ${listHumidity}</div></div>`;
        }
      });
      let citySave = citySelect.value;
      if (pastSearch.includes(citySave.toUpperCase())) {
        return;
      } else {
        pastSearch.unshift(citySave.toUpperCase());
        pastSearch = pastSearch.slice(0, 6);
        console.log(pastSearch);
        localStorage.setItem("citySearch", JSON.stringify(pastSearch));
        init();
      }
    });
}

function pastSearchFunction() {
  cityToSearch = this.getAttribute("city");
  citySelect.value = cityToSearch;
  citySearch();
}

// EVENT LISTENERS
init();

// searchBTN event listener
searchBtn.addEventListener("click", citySearch);
