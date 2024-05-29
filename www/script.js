document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".container").classList.toggle("show-menu");
});

function redirecionarParaOutraPagina() {
    window.location.href = "alertas.html";
}

function redirecionarParaOutraPagina2() {
    window.location.href = "mapa.html";
}

function redirecionarParaOutraPagina3() {
    window.location.href = "clima.html";
}




function mostramapa(lat, long) {
    L.mapquest.key = 'FTEjFfZwSMPUEyt5FmujjGFpnIphjaBv';

    var map = L.mapquest.map('map', {
        center: [lat, long],
        layers: L.mapquest.tileLayer('map'),
        zoom: 12
    });

    map.addControl(L.mapquest.control());
}

$(document).on("click", "#quadradox", function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                mostramapa(position.coords.latitude, position.coords.longitude);
            },
            function (error) {
                alert('code: ' + error.code + '\n' +
                      'message: ' + error.message + '\n');
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});












document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value;

    if (!cityName) {
        document.querySelector("#weather").classList.remove('show');
        showAlert('Você precisa digitar uma cidade...');
        return;
    }

    const apiKey = '33c5a29614ea3e8e036608a045fc46a3';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`

    const results = await fetch(apiUrl);
    const json = await results.json();

    if (json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        });
    } else {
        document.querySelector("#weather").classList.remove('show');
        showAlert(`
            Não foi possível localizar...

            <img src="src/images/404.svg"/>
        `)
    }
});

function showInfo(json){
    showAlert('');

    document.querySelector("#weather").classList.add('show');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;

    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#temp_description').innerHTML = `${json.description}`;
    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)}km/h`;
}

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}