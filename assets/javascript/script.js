var config = {
    apiKey: "AIzaSyDDqL4U9x5ixBVkB_DsMpuF2MZG7X_qIbk",
    authDomain: "testproject-3030.firebaseapp.com",
    databaseURL: "https://testproject-3030.firebaseio.com",
    projectId: "testproject-3030",
    storageBucket: "testproject-3030.appspot.com",
    messagingSenderId: "197294244333"
};
  
firebase.initializeApp(config);
var database = firebase.database()

var userIsLoggedIn = false;

// ----------------------------- CALENDER START------------------------------------------------
$('#modal-add-event').click(function(event){
    // if (userIsLoggedIn){
        event.preventDefault();
    
        // obtain value from add event modal
        var firebaseTitle = $('#modal-name').val();
        var firebaseEventStart = $('#modal-start').val();
        var firebaseEventEnd = $('#modal-end').val();
        var firebaseUrl = $('#modal-url').val();
        var firebaseAddress = $('#modal-address').val();
        //use zipcode in form to access weather API later on
        var firebaseZipcode = $("#modal-zipcode").val().trim();
    
        var postData = {
            title:firebaseTitle,
            start:firebaseEventStart,
            end:firebaseEventEnd,
            url:firebaseUrl,
            address: firebaseAddress,
            zipcode: firebaseZipcode
        };
        database.ref('/calendarEvents/').push(postData);

        //define eventWeather child in format like postData
        var eventWeather = {
            title: "",
            high: "",
            low: "",
            description: "",
            icon: "",
            date: "",
            wind: "",
        };
        
        //access weather database - use apiKey && firebaseZipcode
        var APIKey = "166a433c57516f51dfab1f7edaed8413";
        var weatherURL =
            "https://api.openweathermap.org/data/2.5/forecast/daily?zip=" +
            firebaseZipcode +
            ",us&units=imperial&cnt=7&appid=" +
            APIKey;
        
        //ajax call
        $.ajax({
            url: weatherURL,
            method: "GET"
        }).then(function(response) {
            //define each child in eventWeather object
            $(eventWeather.title).append(firebaseTitle + " weather forecast");
            $(eventWeather.high).append(response.list[i].temp.max);
            $(eventWeather.low).append(response.list[i].temp.min);
            $(eventWeather.description).append(response.list.weather[i].description);
            $(eventWeather.icon).append(response.list[i].weather[0].icon);
            $(eventWeather.date).append(moment.unix(response.list[i].dt).format("ddd, MMM D"));
            $(eventWeather.wind).append(response.list[i].speed);
        });

        
        
        //push to "this" event as it is created
        database.ref('/calendarEvents/postData/').push(eventWeather);

    // } else {
    //     $('.close').trigger('click');
    //     $('#Signup-button-modal').trigger('click');
    // }
});

// obtain data from Firebase and plot data on fullcalendar
database.ref('/calendarEvents/').on("child_added", function(snapshot) {
    $('#calendar').fullCalendar('renderEvent', snapshot.val());
}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// ----------------------------- CALENDER END------------------------------------------------


// ----------------------------- USER ACCOUNT START------------------------------------------------

// SIGNUP
$('#modal-signup').click(function(event){
    event.preventDefault();

    // obtain value from add event modal
    var firebaseemail = $('#modal-signupemail').val();
    var firebaseusername = $('#modal-signupuser').val();
    var firebasepassword = $('#modal-signuppassword').val();

    var postData = {
        email: firebaseemail,
        username: firebaseusername,
        password: firebasepassword
    };
    database.ref('/accounts/').push(postData);
});

// LOGIN
$('#modal-login').click(function(event){
    var loginUsername = $('#modal-loginuser').val();
    var loginPassword = $('#modal-loginpassword').val()

    database.ref('/accounts/').on("child_added", function(snapshot) {
        var fireBaseAccount = snapshot.val();
        if (fireBaseAccount.username === loginUsername && fireBaseAccount.password === loginPassword){
            userIsLoggedIn = true;
        } else {
            console.log('stop it');
        }
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
});


// ----------------------------- USER ACCOUNT END------------------------------------------------


// ----------------------------- UPDATE EVENT WEATHER START -------------------------------------

setTimeout(function(){ //THIS CONTAINS EVERYTHING

    //loop through calendar events to access each one's weather data
    var eventArray = database.ref("/calendarEvents/");
    for (i=0; i<eventArray.length; i++) {
        //var accesses weather data by EACH event's key
        var eventWeather = database.ref("/calendarEvents/" + [i] + "/postData/eventWeather/"); //it's EITHER "[i]" OR "this", not both?

        //vars to enter into weatherAPI query
        var weatherZip = "/calendarEvents/" + [i] + "/postData/zipcode/";
        var APIKey = "166a433c57516f51dfab1f7edaed8413";
        
        //create weatherURL var by zipcode && APIkey
        var weatherURL =
            "https://api.openweathermap.org/data/2.5/forecast/daily?zip=" +
            weatherZip +
            ",us&units=imperial&cnt=7&appid=" +
            APIKey;
        //query weatherAPI per event in our Firestore
        $.ajax({
            url: weatherURL,
            method: "GET"
        }).then(function(response) {
            //sets weather vars == weatherAPI's data
            var highAPI = response.list[i].temp.max;
            var lowAPI = response.list[i].temp.min;
            var descriptionAPI = response.list[i].weather[0].description;
            var iconAPI = response.list[i].weather[0].icon;
            var dateAPI = moment.unix(response.list[i].dt).format("ddd, MMM D");
            var windAPI = response.list[i].speed;

            //make event's weather data equal the weather from the API call
            eventWeather.set ({
                high: highAPI,
                low: lowAPI,
                description: descriptionAPI,
                icon: iconAPI,
                date: dateAPI,
                wind: windAPI
            });    
            console.log(response);
        })

    }  
}, 3600000); //end of setTimeout (3600000 == 1 hour)


// ----------------------------- UPDATE EVENT WEATHER END -------------------------------------
