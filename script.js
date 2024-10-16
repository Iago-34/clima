async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = 'f1b2fb9637ca264023dec5a0c1d51c56'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Cidade não encontrada');
        }

        const data = await response.json();
        const temp = data.main.temp.toFixed(1);
        const weatherDescription = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = (data.wind.speed * 3.6).toFixed(1); 
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

        document.getElementById('temperature').textContent = `${temp}°C`;
        document.getElementById('description').textContent = weatherDescription;
        document.getElementById('humidity').textContent = `${humidity}%`;
        document.getElementById('wind-speed').textContent = `${windSpeed} Km/h`;
        document.getElementById('weather-icon').src = iconUrl;
    } catch (error) {
        alert(error.message);
    }
}

function saveCity() {
    const city = document.getElementById('city').value;
    if (city) {
        localStorage.setItem('saveCity', city);
    } else {
        alert('Por favor, insira uma cidade antes de salvar.');
    }
}

function loadSaveCity() {
    const savedCity = localStorage.getItem('savedCity');
    if (savedCity) {
        document.getElementById('city').value = savedCity;
        getWeather();
    }
}

window.onload = loadSaveCity;