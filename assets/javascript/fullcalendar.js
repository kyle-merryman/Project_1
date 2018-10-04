$(document).ready($(function() {

    // page is now ready, initialize the calendar...
  
    $('#calendar').fullCalendar({
        editable: true, 
        header:{
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        event: 'load.php',
    });
    
  
  }));

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB38HE7Q8jr7CmRQolpUM87wuoXE1jZBi0",
    authDomain: "forecast-test-30b06.firebaseapp.com",
    databaseURL: "https://forecast-test-30b06.firebaseio.com",
    projectId: "forecast-test-30b06",
    storageBucket: "",
    messagingSenderId: "218000094980"
};
firebase.initializeApp(config);

// $data = array();

