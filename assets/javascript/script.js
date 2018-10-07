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

var Events = [];

$('#modal-add-event').click(function(event){
    event.preventDefault();

    var firebaseTitle = $('#modal-name').val();
    var firebaseEventStart = $('#modal-start').val();
    var firebaseEventEnd = $('#modal-end').val();
    var firebaseUrl = $('#modal-url').val();

    var postData = {
        title:firebaseTitle,
        start:firebaseEventStart,
        end:firebaseEventEnd,
        url:firebaseUrl
    };

    database.ref('/calendarEvents/').push(postData);
});

database.ref('/calendarEvents/').on("value", function(snapshot) {

    for (item in objectModel){

        Events.push(objectModel[item]);
        
    }
    CalendarHelper();

}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});