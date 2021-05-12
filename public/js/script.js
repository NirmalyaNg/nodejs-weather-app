const weatherForm = document.querySelector("#weatherForm");
const textInput = document.querySelector("#weatherInput");

const weather = document.querySelector(".weather");
const actualTemp = document.querySelector(".actual_temperature");
const feelslike = document.querySelector(".feelslike");
const descriptionDiv = document.querySelector(".description");
const descriptionicon = document.querySelector(".icon");
const descriptionText = document.querySelector(".text");
const placeDiv = document.querySelector(".place");
const tempValue = document.querySelector(".tempValue");
const feelslikeValue = document.querySelector(".feelslikeValue");
const loading = document.querySelector(".loading");

weather.style.display = "none";
loading.style.display = "none";

const displayWeather = ({
  temperature,
  feelslike,
  description,
  place,
  icon,
} = {}) => {
  loading.style.display = "none";
  weather.style.display = "block";

  tempValue.textContent = temperature;
  feelslikeValue.textContent = feelslike;
  descriptionText.textContent = description;
  descriptionicon.src = icon;
  placeDiv.textContent = place;

  textInput.value = "";
};

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  weather.style.display = "none";
  loading.style.display = "block";

  // If location text input is empty
  if (textInput.value.trim() === "") {
    alert("Please provide a location");
    loading.style.display = "none";
  } else {
    fetch(`/weather?location=${textInput.value}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          textInput.value = "";
          return alert(data.error);
        }
        displayWeather(data.forecast);
      });
  }
});
