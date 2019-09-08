let appId = '30fe48c94183f25a5cf5b5a1d8357fc2';
let unit = 'metric';

function search(searchText){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchText}&APPID=${appId}&units=${unit}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

function init(fromServer){
    switch (fromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("/images/clear.jpg")';
            break;

        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("/images/thunderstorm.jpg")';
            break;

        case 'Clouds':
            document.body.style.backgroundImage = 'url("/images/clouds.jpg")';
            break;

        case 'Snow':
            document.body.style.backgroundImage = 'url("/images/snow.jpg")';
            break;      

        case 'Rain':
        case 'Mist':
        case 'Drizzle':  
            document.body.style.backgroundImage = 'url("/images/rain.jpg")';      
            break;

        default:
            break;
    }

    let description = document.getElementById('description');
    let temperature = document.getElementById('temperature');
    let humidity = document.getElementById('humidity');
    let wind = document.getElementById('wind');
    let city = document.getElementById('city-name');
    let pressure = document.getElementById('pressure');
    let icon = document.getElementById('icon');

    icon.src = 'http://openweathermap.org/img/w/' + fromServer.weather[0].icon + '.png';

    let resultDescription = fromServer.weather[0].description;
    description.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

    temperature.innerHTML = Math.floor(fromServer.main.temp) + '&#176' + 'C';
    wind.innerHTML = 'Wind: ' + Math.floor(fromServer.wind.speed) + ' m/s';
    city.innerHTML = fromServer.name;
    humidity.innerHTML = 'Humidity: ' + fromServer.main.humidity + '%';
    pressure.innerHTML = 'Pressure: ' + Math.floor(fromServer.main.pressure) + ' hPa';
    
    setBoxPosition();
}

 function setBoxPosition() {
    let weatherBox = document.getElementById('weather-box');
    let headerBox = document.getElementById('header');
    let weatherBoxHeight = weatherBox.clientHeight;
    let weatherBoxWidth = weatherBox.clientWidth;

    weatherBox.style.left = `calc(50% - ${weatherBoxWidth/2}px)`;
    weatherBox.style.top = `calc(50% - ${weatherBoxHeight/2}px)`;
    weatherBox.style.visibility = 'visible';
    headerBox.style.visibility = 'hidden';
}


document.getElementById('button').addEventListener('click', () => {
    let searchText = document.getElementById('search-text').value;
    if(searchText){
        search(searchText);
    }
})
