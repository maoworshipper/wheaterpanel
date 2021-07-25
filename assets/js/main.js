
// Mostrar información Bogotá

function cityWeather() {

    let temperatura = document.querySelector(".temperatura");
    let descripcion = document.querySelector(".descripcion");
    let imagen = document.querySelector(".icono");
    const xhr = new XMLHttpRequest();

    xhr.open(
      "GET",
      'https://api.openweathermap.org/data/2.5/weather?q=Bogota&appid=01c178aa800cbe70e4133558c3f083f7');

    xhr.send();
    xhr.onload = () => {
      if (xhr.status === 404) {
        console.log("No fue posible cargar la información");
      } else {
        var data = JSON.parse(xhr.response);
        temperatura.innerHTML = `${Math.round(data.main.temp - 273.15)}` + "<span>°C</span>";
        imagen.innerHTML = "<i class='fas fa-" + iconWheater(data.weather[0].id) + " fa-3x'></i><span class='descripcion'>" + data.weather[0].main +"</span>";
      }
    };
  };

    // Mostrar información 3 días siguentes Bogotá

    function daysWeather() {

        let widget = document.querySelector(".moredays");
        const xhr = new XMLHttpRequest();
    
        xhr.open(
          "GET",
          'https://api.openweathermap.org/data/2.5/onecall?lat=4.60971&lon=-74.08175&exclude=minutely,hourly,alerts&appid=01c178aa800cbe70e4133558c3f083f7&lang=es');
    
        xhr.send();
        xhr.onload = () => {
          if (xhr.status === 404) {
            console.log("No fue posible cargar la información");
          } else {
            var data = JSON.parse(xhr.response);
            let imagen;
            let actualDate = new Date();
            let actualDay;
            let minTemp;
            let maxTemp

            for(let i=0; i<3; i++){

                actualDay = actualDate.getDay();
                day = getDayOfWeek((actualDay + i + 1));
                minTemp = `${Math.round(data.daily[i].temp.min - 273.15)}°`;
                maxTemp = `${Math.round(data.daily[i].temp.max - 273.15)}°`;
                imagen = `https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`;

                widget.innerHTML += "<div class='dayforecast' id='widget-" + i + "'><div class='widget-icon'><i class='fas fa-" + iconWheater(data.daily[i].weather[0].id) + " fa-3x'></i></div><div class='widget-description'><span class='widget-day'>" + day + "</span><span class='widget-info'>" + data.daily[i].weather[0].main + "</span></div><div class='widget-temperatura'><span>" + minTemp + " / " + maxTemp + "</span></div></div>";
            }
          }
        };
      };

  // Mostrar información otras ciudades

  function citiesWeather(myCity) {

    let cities = document.querySelector("#cities");
    const xhr = new XMLHttpRequest();

    xhr.open(
      "GET",
      'https://api.openweathermap.org/data/2.5/weather?q=' + myCity + '&appid=01c178aa800cbe70e4133558c3f083f7');

    xhr.send();
    xhr.onload = () => {
      if (xhr.status === 404) {
        console.log("No fue posible cargar la información");
      } else {
        var data = JSON.parse(xhr.response);
        let temperatura = `${Math.round(data.main.temp - 273.15)}` + "<span>°C</span>";
        let windDirection = degToCompass(data.wind.deg);
        
        cities.innerHTML += "<div class='card' id='card-" + myCity + "'><div class='row'><div class='card-icon'><i class='fas fa-" + iconWheater(data.weather[0].id) + " fa-3x'></i></div><div class='card-temperatura'>" + temperatura + "</div><div class='card-lugar'>" + data.name + "</div></div><div class='row'><div class='humidity'>Humidity: " + data.main.humidity + "</div><div class='wind'>" + windDirection + "</div><div class='velocity'>" + data.wind.speed + " Km/h</div></div></div>";
        
      }
    };
  };


// iconos a mostrar según estado del tiempo

function iconWheater(wheaterState) {

    if(wheaterState >= 200 && wheaterState <= 299){ return "bolt"; }
    if(wheaterState >= 300 && wheaterState <= 399){ return "cloud-rain"; }
    if(wheaterState >= 500 && wheaterState <= 599){ return "cloud-showers-heavy"; }
    if(wheaterState >= 600 && wheaterState <= 699){ return "snowflake"; }
    if(wheaterState >= 700 && wheaterState <= 799){ return "smog"; }
    if(wheaterState >= 800){ return "sun"; }
    if(wheaterState >= 801 && wheaterState <= 804){ return "cloud"; }

}

// Conversión de dirección del texto de grados a texto 

function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["North", "North-Northest", "Northest", "Est-Northest", "Est", "Est-Southest", "Southest", "South-Southest", "South", "South-Southwest", "Southwest", "West-Southwest", "West", "West-Northwest", "Northwest", "North-Northwest"];
    return arr[(val % 16)];
}

// Conversión día de la semana de número a texto

function getDayOfWeek(myday){
    let days =["Monday","Tuesday","Wenesday","Thursday","Friday","Saturday","Sunday"];
    if(myday > 7){
        return days[(myday-8)];
    }
    else{
        return days[(myday-1)];
    }
}

  cityWeather();
  daysWeather();
  citiesWeather('madrid');
  citiesWeather('paris');