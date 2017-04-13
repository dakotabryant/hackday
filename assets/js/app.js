//TEMPLATES
//state object
let s = {
  weather: [],
  weatherAPIKey: 'appid=22bb9867ef69b1e3bad17c9e2f85d1a1',
  geoKey: 'key=AIzaSyDaLi4kejMskpWXIeVQwXWMviWSoj-ZQOA'
}
//state manipulation functions
sF = {
getWeather: function(search){
  $.getJSON(`http://api.openweathermap.org/data/2.5/find?q=${search}&type=like&${s.weatherAPIKey}`,function(data){
      s.weather = data.list;
      console.dir(s.weather);
    });

  },
geolocate: function() {
	let location = navigator.geolocation.watchPosition(function(position) {
		let lat = `lat=${position.coords.latitude}`;
		let lon = `lon=${position.coords.longitude}`;
		let input = `${lat}&${lon}`;
		sF.getWeather(input);
	});	
}
	
	
}

//view manipulation functions
vF = {
  
}

$('#search-field').keypress(function(event){
  console.log(event.charCode);
  if(event.charCode=='13'){
    sF.getWeather($(this).val().toString())
  }
})

$('#geoLocate').click(function(event) {
	sF.geolocate();
});
