$("#weatherSearch").on("click", function(e) {
  event.preventDefault();
  var weatherZip = $("#weatherInput")
    .val()
    .trim();

  // API to get City and State by ZIP Code
  var zipURL = "https://api.zippopotam.us/us/" + weatherZip;
  $.ajax({
    url: zipURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $(".city").html(
      "<h1>" +
        response.places[0]["place name"] +
        ", " +
        response.places[0]["state abbreviation"] +
        "</h1>"
    );
  });

  // API for Weather Info by ZIP Code
  var APIKey = "166a433c57516f51dfab1f7edaed8413";
  var weatherURL =
    "https://api.openweathermap.org/data/2.5/forecast/daily?zip=" +
    weatherZip +
    ",us&units=imperial&cnt=7&appid=" +
    APIKey;
  $.ajax({
    url: weatherURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $("#weatherRow").empty();

    // For loop to get weather data for 7 days
    for (var i = 0; i < response.list.length; i++) {
      // Convert Unix Timestamp to Date
      var unixConvert = moment.unix(response.list[i].dt).format("ddd, MMM D");

      var newDiv = $("<div>")
        .append(
          $("<p>").text(unixConvert),
          $("<img>").attr(
            "src",
            "https://openweathermap.org/img/w/" +
              response.list[i].weather[0].icon +
              ".png"
          ),
          $("<p>")
            .text(response.list[i].weather[0].description)
            .addClass("weather"),
          $("<p>").text(
            "High: " + Math.round(response.list[i].temp.max) + "° F"
          ),
          $("<p>").text(
            "Low: " + Math.round(response.list[i].temp.min) + "° F"
          ),
          $("<p>").text("Wind: " + response.list[i].speed + " mph")
        )
        .addClass("col");
      $("#weatherRow").append(newDiv);
    }
  });
});
