//TEMPLATES
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
	getWeather: function(search){
		$.getJSON(`http://api.openweathermap.org/data/2.5/forecast?q=${search}&type=like&${s.weatherAPIKey}`,function(data){
				s.object = data.list;
				//console.dir(s.weather);
				//vF.populateWeatherBoxes();
		});
  },
	
	parseWeather: function(data) {	
		for(let i=4;i<40;i+=8){
			var day = {};
		day.id = data[i].weather[0].id;
		day.weather = data[i].weather[0].main;
		day.temp = data[i].main.temp;
		day.windspeed = data[i].wind.speed;
		s.weather.push(day);
		}
		
	},
	
	geolocate: function() {
		let location = navigator.geolocation.watchPosition(function(position) {
			let lat = `lat=${position.coords.latitude}`;
			let lon = `lon=${position.coords.longitude}`;
			let input = `${lat}&${lon}`;
			sF.getWeather(input);
		});
	}
};

//view manipulation functions
//vF = {
//  populateWeatherBoxes(){
//    $("#heroBox").html(vF.getWeatherIcon(s.weather[0].weather[0]));
//    $("#box1").html(vF.getWeatherIcon(s.weather[1].weather[0]));
//    $("#box2").html(vF.getWeatherIcon(s.weather[2].weather[0]))
//    $("#box3").html(vF.getWeatherIcon(s.weather[3].weather[0]))
//    $("#box4").html(vF.getWeatherIcon(s.weather[4].weather[0]))
//  },
//  getWeatherIcon(index){
//    console.log("Logging index:")
//    console.log(index);
//    if(index.id >=800 && index.id<=802){
//      return s.weatherIcons.sunny + " " + index.description;
//    }else if(index.id >= 803 && index.id<=804){
//      return s.weatherIcons.cloudy+ " " + index.description;
//    }else if(index.id >= 300 && index.id<=531){
//      return s.weatherIcons.rainy+ " " + index.description;
//    }
//    console.log("logging id:")
//    console.log(index.id)
//  }
//}

$('#search-field').keypress(function(event){
  //console.log(event.charCode);
  if(event.charCode=='13'){
    sF.getWeather($(this).val().toString())
  }
})

$('#geoLocate').click(function(event) {
	sF.geolocate();

});
