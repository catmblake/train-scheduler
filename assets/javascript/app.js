var config = {
    apiKey: "AIzaSyCVJXOqJoyHumv4_t8rLVitp_KL5A-2uiM",
    authDomain: "train-scheduler-7f5fd.firebaseapp.com",
    databaseURL: "https://train-scheduler-7f5fd.firebaseio.com",
    projectId: "train-scheduler-7f5fd",
    storageBucket: "train-scheduler-7f5fd.appspot.com",
    messagingSenderId: "215035253914"
  };
  firebase.initializeApp(config);

var dataRef = firebase.database();

// VARIABLES
var trainName = "";
var destination = "";
var firstTime = 0;
var frequency= 0;

$("#add-train").on("click", function(event) {
    event.preventDefault();
    
    trainName = $("#train-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTime = $("#first-time-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    var trainObject = {
        name: trainName,
        destination: destination,
        first: firstTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

    dataRef.ref().push(trainObject);
    console.log(trainObject);
});