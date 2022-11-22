// GLOBAL VARIABLES
let searchBtn = document.querySelector("#searchBtn");
let appId = "c1a401c2171b4a3ca3969046ad42c547";
// divs on the side of the HTML

// FUNCTIONS
function init() {
  // grab last search results from local storage, place on left side of page
}

//
function citySearch() {
  // Set City to change with the .val of the text input box
  let citySelect = "chicago";
  let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${citySelect}&appid=${appId}`;
  console.log(requestUrl);
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

// EVENT CALLS

// EVENT LISTENERS
init();

// searchBTN event listener
searchBtn.addEventListener("click", citySearch);

// pastSearchBTN event listener
