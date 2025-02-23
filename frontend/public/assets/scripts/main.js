import Swal from 'sweetalert2'

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    document.title = "Come back soon!";
  } else {
    document.title = "Weather DApp";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".weather__input");
  const button = document.querySelector(".weather__button");
  const cityName = document.querySelector(".weather__city");
  const temperature = document.querySelector(".weather__temperature");
  const humidity = document.querySelector(".weather__humidity");
  const windSpeed = document.querySelector(".weather__wind-speed");
  const feels_like = document.querySelector(".weather__feels-like");
  const condition = document.querySelector(".weather__condition");

  button.addEventListener("click", async () => {
      const city = input.value.trim();
      if (!city) return alert("Please enter a city");

      try {
          const response = await fetch(`http://localhost:3000/weather?city=${city}`);
          const data = await response.json();

          if (response.status !== 200 || data.error) {
              alert("City not found");
              return;
          }

          cityName.textContent = data.name;
          temperature.textContent = `${data.main.temp}°C`;
          humidity.textContent = `Humidity: ${data.main.humidity}%`;
          windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
          feels_like.textContent = `Feels Like: ${data.main.feels_like}°C`;
          condition.textContent = `Condition: ${data.weather[0].description}`;
      } catch (error) {
          console.error("Error fetching weather data:", error);
      }
  });
});