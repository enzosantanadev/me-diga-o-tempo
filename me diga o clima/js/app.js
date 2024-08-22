document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '0fa74098ba19999fc213b156001948ca'; // Sua chave da API OpenWeatherMap
    const weatherResult = document.getElementById('weather-result');
    
    document.getElementById('get-weather-btn').addEventListener('click', () => {
        const city = document.getElementById('city-input').value;

        if (!city) {
            weatherResult.textContent = 'digite o nome da cidade.';
            return;
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === '404') {
                    weatherResult.textContent = 'cidade não encontrada.';
                    return;
                }

                const temperature = data.main.temp;
                const description = data.weather[0].description;
                const icon = data.weather[0].icon;
                const cityName = data.name;
                const country = data.sys.country;

                weatherResult.innerHTML = `
                    <h2>${cityName}, ${country}</h2>
                    <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}" />
                    <p>${temperature}°C</p>
                    <p>${description}</p>
                `;
            })
            .catch(error => {
                weatherResult.textContent = 'erro ao buscar o clima tente de novo';
            });
    });
});
