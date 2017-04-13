//state object
let s = {
	object : {},
  weather: [],

  weatherAPIKey: 'appid=22bb9867ef69b1e3bad17c9e2f85d1a1',
  geoKey: 'key=AIzaSyDaLi4kejMskpWXIeVQwXWMviWSoj-ZQOA',
  weatherIcons: {
    sunny: `<i class="wi wi-day-sunny "></i>`,
    cloudy: `<i class="wi wi-cloudy"></i>`,
    rainy: `<i class="wi wi-rain"></i>`,
    thunder: `<i class="wi wi-thunderstorm"></i>`,
    snow: `<i class="wi wi-snow"></i>`,
  }
}
//state manipulation functions
sF = {
  self: this,
	getWeather: function(search){
		$.getJSON(`http://api.openweathermap.org/data/2.5/forecast?${search}&type=like&${s.weatherAPIKey}`,function(data){
				s.object = data.list;
				s.city = data.city;
        console.log("test")
				sF.parseWeather(s.object);
        //populate boxes
        vF.populateWeatherBoxes()
		});
  },

	parseWeather: function(data) {
    s.weather = [];
		for(let i=4;i<40;i+=8){
			var day = {};
		day.id = data[i].weather[0].id;
    day.icon = data[i].weather[0].icon;
		day.weather = data[i].weather[0].main;
		day.temp = ((data[i].main.temp*(9/5))-459.67).toFixed(0);
		day.windSpeed = data[i].wind.speed;
		day.location = 'This is your city';
		day.positionLat = s.city.coord.lat;	
		day.positionLon = s.city.coord.lon;	
		s.weather.push(day);
		}
	},

	geolocate: function() {
		let location = navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Running geolocation");
			
			let lat = `lat=${position.coords.latitude}`;
			let lon = `lon=${position.coords.longitude}`;
			let input = `${lat}&${lon}`;
			sF.getWeather(input);
			console.log(input);
		});
	}
};

//view manipulation functions
vF = {
  //populate the windows
  populateWeatherBoxes: function(){
    $('#heroLocation').html(`<p>Latitude: ${(s.weather[0].positionLat).toFixed(2)}</p><br><p>Longitude: ${(s.weather[0].positionLon).toFixed(2)}</p>`);
    $('#heroBox').html(`<img src='http://openweathermap.org/img/w/${s.weather[0].icon}.png'><br>${s.weather[0].weather}`);
    $('#heroData').html(`<span>Temperature: ${s.weather[0].temp}</span><br>
                         <span>Wind Speed: ${s.weather[0].windSpeed}</span>`)
    $('#box1').html(`<img src='http://openweathermap.org/img/w/${s.weather[1].icon}.png'><br>${s.weather[1].weather}`);
    $('#box2').html(`<img src='http://openweathermap.org/img/w/${s.weather[2].icon}.png'><br>${s.weather[2].weather}`);
    $('#box3').html(`<img src='http://openweathermap.org/img/w/${s.weather[3].icon}.png'><br>${s.weather[3].weather}`);
    $('#box4').html(`<img src='http://openweathermap.org/img/w/${s.weather[4].icon}.png'><br>${s.weather[4].weather}`);
  }
}

$('#search-field').keypress(function(event){
  //console.log(event.charCode);
  if(event.charCode=='13'){
    event.preventDefault();
		var inputSearch = `q=${$(this).val().toString()}`;
    sF.getWeather(inputSearch);
  }
})

$('#geoLocate').click(function(event) {
	sF.geolocate();
  event.preventDefault();
});
