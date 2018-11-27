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

//Variables to hold the user input
var trainName = "";
var destination = "";
var firstTime = "";
var frequency = "";

//Preventing the page from refreshing when user clicks submit button
$("#add-train").on("click", function (event) {
    event.preventDefault();
    //Setting values of these variables to user input
    trainName = $("#train-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTime = $("#first-time-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    //Creating train object with keys and values and pushing it to be stored in firebase
    var trainObject = {
        name: trainName,
        destination: destination,
        first: firstTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

    dataRef.ref().push(trainObject);
    console.log(trainObject);
    //Resetting the form to empty the input fields
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");
});

//Getting train data from firebase and storing in the variables I created
dataRef.ref().on("child_added", function (childSnapshot) {
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().first;
    var frequency = childSnapshot.val().frequency;
    console.log("Train name: " + trainName);
    console.log("Destination: " + destination);
    console.log("First Train Time: " + firstTime);
    console.log("Train Frequency: " + frequency + " minutes");
});