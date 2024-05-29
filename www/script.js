document.querySelector(".hamburger").addEventListener("click", () =>
    document.querySelector(".container").classList.toggle("show-menu")
);

function redirecionarParaOutraPagina() {
    // Substitua "outra-pagina.html" pelo URL da página para a qual deseja redirecionar
    window.location.href = "alertas.html";
}
function redirecionarParaOutraPagina2() {
    // Substitua "outra-pagina.html" pelo URL da página para a qual deseja redirecionar
    window.location.href = "mapa.html";
}


//Código mapa

    var onSuccess = function(position) {
        alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +);
    };


    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);










function mostramapa(lat, long){
L.mapquest.key = 'FTEjFfZwSMPUEyt5FmujjGFpnIphjaBv';

var map = L.mapquest.map('map', {
  center: [lat,long],
  layers: L.mapquest.tileLayer('map'),
  zoom: 12
});

map.addControl(L.mapquest.control());
}

$ (document).on("click","#quadradox",function(){
    var onSuccess = function(position) {
        mostramapa(position.coords.latitude, position.coords.longitude)
    }});