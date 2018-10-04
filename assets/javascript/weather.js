$("#zipSearch").on("click", function(e) {
  event.preventDefault();
  var zipcode = $("#zipInput")
    .val()
    .trim();
  var APIKey = "166a433c57516f51dfab1f7edaed8413";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?zip=" +
    zipcode +
    ",us&units=imperial&appid=" +
    APIKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $(".city").html("<h1>" + response.name + " Weather Details</h1>");
    $(".icon").html(
      "<img src='http://openweathermap.org/img/w/" +
        response.weather[0].icon +
        ".png'>"
    );
    $(".weather").text("Weather: " + response.weather[0].description);
    $(".temp").text("Temperature (F) " + response.main.temp);
    $(".humidity").text("Humidity: " + response.main.humidity);
    $(".wind").text("Wind Speed: " + response.wind.speed);
  });
});
