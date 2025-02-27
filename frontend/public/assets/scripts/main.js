import Swal from "sweetalert2";

document.addEventListener("visibilitychange", () => {
  document.title = document.hidden ? "Come back soon!" : "Weather DApp";
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

  const API_URL = "https://web3-dapp-weather-production.up.railway.app/"

  const fetchWeather = async () => {
    const city = input.value.trim();
    if (!city) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Please enter a city!",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    try {
      const response = await fetch(`${API_URL}weather?city=${city}`);
      const data = await response.json();

      if (!response.ok || data.error) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "warning",
          title: "City not found!",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        return;
      }

      cityName.textContent = data.name;
      temperature.textContent = `${data.main.temp}°C`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
      feels_like.textContent = `Feels Like: ${data.main.feels_like}°C`;
      condition.textContent = `Condition: ${data.weather[0].description}`;

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "City found!",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      Swal.fire({
        icon: "error",
        title: "Error fetching data",
        toast: true,
        position: "top-right",
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      input.value = "";
    }
  };

  button.addEventListener("click", fetchWeather);
  input.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      fetchWeather();
    }
  });
});