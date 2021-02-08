const notification= document.querySelector(".Notification");
const icon = document.querySelector('.weather-icon');
const tempValue= document.querySelector('.temperature-value p' );
const tempDescription = document.querySelector('.temperature-description p');
const city= document.querySelector('.location p');

var weather={
    temperature:{
        description:'cloudy',
        value:22,
        unit: 'celsius'
    },
    iconId:'/home/giuseppe/Desktop/weather_app/starter template/icons/04d.png',
    city: 'berlin',
    country:'GE'

};
const apiKey="35f756552435fcf167a2e9ddc29868e6";

    if ('geolocation'in navigator){
        navigator.geolocation.getCurrentPosition(showPosition,showError)
    }
    else{
        notification.style.display="block";
        notification.innerHTML= 'location is not possible for this browser'
    }

function showPosition(position){
    let latitude=position.coords.latitude;
    let longitude=position.coords.longitude;
   // notification.innerHTML="we have a latitude of"+latitude+"and a longitude of"+longitude;

    getWeather(latitude,longitude);

}

function showError(error){
    notification.style.display="block";
    notification.innerHTML= `<p>${error.message}</p>`;
}

function getWeather(latitude,longitude){
const api=`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${apiKey}`;

fetch(api)
      .then(function (response){
      data=response.json();
      return data;
})
      .then(function(data){
      weather.temperature.value=data.current.temp;
      weather.temperature.description=data.current.weather[0].description;
      weather.iconId=data.current.weather[0].icon;
      weather.city=data.timezone;
      })
      .then(function(){
          displayweather();
      })
      
}
function displayweather(){
    tempValue.innerHTML=Math.floor(weather.temperature.value-273)+" °"+"C";
    tempDescription.innerHTML=weather.temperature.description;
    city.innerHTML=weather.city;
    icon.innerHTML=`<img src="/home/giuseppe/Desktop/weather_app/starter template/icons/${weather.iconId}.png"/>`;
}
