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
        event.preventDefault();
    
        // obtain value from add event modal
        var firebaseTitle = $('#modal-name').val();
        var firebaseEventStart = $('#modal-start').val();
        var firebaseEventEnd = $('#modal-end').val();
        var firebaseUrl = $('#modal-url').val();
        var firebaseAddress = $('#modal-address').val();
    
        var postData = {
            title:firebaseTitle,
            start:firebaseEventStart,
            end:firebaseEventEnd,
            url:firebaseUrl,
            address: firebaseAddress,
        };
        database.ref('/calendarEvents/').push(postData);
});
$('#addEventModalOpen').click(function(event){
    event.preventDefault();
    if(userIsLoggedIn){
        $('#addEventModalOpen')[0].dataset.target = "#myModal";
    } else {
        $('#addEventModalOpen')[0].dataset.target = "";
        $('#Signup-button-modal').trigger('click');
    }
})

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

    database.ref('/accounts/').on("value", function(snapshot) {
        var showShouldLogIn = true;
        for (var account in snapshot.val()){
            var fireBaseAccount = snapshot.val()[account];
            if (fireBaseAccount.username === loginUsername && fireBaseAccount.password === loginPassword){
                userIsLoggedIn = true;
                return;
            } 
        }
        if (showShouldLogIn) {
            console.log('please log in');
        }
        
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
});


// ----------------------------- USER ACCOUNT END------------------------------------------------