const cityName = document.getElementById('city');
const time = document.getElementsByClassName('time');
const temp =  document.getElementById('temp');
const sky =  document.getElementById('sky-condition');
let notifyContainer = document.querySelector('.notify-container');
//wind-speed humidity visibility 
const windSpeed =  document.getElementById('wind');
const humidity = document.getElementById('hum');
const visibility = document.getElementById('visi'); 
//icon div selection
const conditionIcon = document.querySelector('.cloud-icon');


//geo location button
const allowGeo = document.getElementsByClassName('allow-location');
//form of geolocation allow
const geoLocationBtn = document.getElementById('geo');
geoLocationBtn.addEventListener('submit', (e)=>{
    e.preventDefault();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        alert('Your device is not supported Geo location')
     }
    }
    
)

//xml request create
let apiRequest = new XMLHttpRequest();

function showPosition(position) {
  
    let lati = position.coords.latitude;
    let long = position.coords.longitude;
    

    apiRequest.open('GET', 'https://api.openweathermap.org/data/2.5/weather?lat=' + lati+'&lon=' + long + '&units=metric&APPID=e9bfda8d1c55d657e2a6495c5ce65bcc');
    apiRequest.send();
  }
  
  apiRequest.onreadystatechange = () =>{
    if(apiRequest.readyState === 1){
       notifyContainer.style.display = "block";
    }else 
        if(apiRequest.readyState === 4){
          notifyContainer.style.display = "none";
      const response = JSON.parse(apiRequest.response);
      console.log(response);
      //city name is modify
      cityName.textContent = `${response.name},`;
      //temparetare in code
      temp.textContent= response.main.temp;

      //cloud condition icon code
        const icon = response.weather[0].icon;
        console.log(icon);
        conditionIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="cloud condition icon">`;
      //sky condition code
     sky.textContent= ` sky is ${response.weather[0].description}`;

     //wind-speed code
     windSpeed.textContent= `${response.wind.speed} KM/h`;
    
     //humidity code
     humidity.textContent  = `${response.main.humidity}%`;
     
     //visibility code 
     const visi = response.visibility/1000;
     visibility.textContent= `${visi} KM`;

    }
  }

  //search by city name
//search bar and search btn
const searchCity = document.getElementById('search-input');
const searchForm = document.getElementById('search-form'); 

  let cityApiRequest = new XMLHttpRequest();
  searchForm.addEventListener('submit', function(e){
    e.preventDefault();
     let searchCityName = searchCity.value;

    cityApiRequest.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + searchCityName +'&units=metric&APPID=b34fddd3dae4a2eb0ad363b62f98ba1e');
    cityApiRequest.send();
   })

   cityApiRequest.onreadystatechange = () =>{
    if(cityApiRequest.Status === 404){
      cityName.textContent = "city not found";
    }
    if(cityApiRequest.readyState === 1){
       notifyContainer.style.display = "block";
    }else 
        if(cityApiRequest.readyState === 4){
          notifyContainer.style.display = "none";
      const response = JSON.parse(cityApiRequest.response);
      console.log(response)
      //city name is modify
      cityName.textContent = `${response.name},`;
      //temparetare in code
      temp.textContent= response.main.temp;

      //cloud condition icon code
        const icon = response.weather[0].icon;
        conditionIcon.innerHTML = `<img class = "icona" src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="cloud condition icon">`;
      //sky condition code
     sky.textContent= ` sky is ${response.weather[0].description}`;

     //wind-speed code
     windSpeed.textContent= `${response.wind.speed} KM/h`;
    
     //humidity code
     humidity.textContent  = `${response.main.humidity}%`;
     
     //visibility code 
     const visi = response.visibility/1000;
     visibility.textContent= `${visi} KM`;

    }
  }



