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
    // Creating if statement to prevent submission of incomplete train data
    if (trainName && destination && firstTime && frequency){
    dataRef.ref().push(trainObject);
    //Resetting the form to empty the input fields
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");
    }
    else {
        alert("Please complete all train information fields")
    }
});

//Getting train data from firebase and storing in the variables I created
dataRef.ref().on("child_added", function (childSnapshot) {
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().first;
    var frequency = childSnapshot.val().frequency;

    //Using moment js to format the times and perform calculations for the train schedules
    var momentTrainStart = moment(firstTime, "HH:mm").subtract(1, "years");
    var remainder = moment().diff(momentTrainStart, "minutes") % frequency;
    var minsAway = frequency - remainder;
    var nextArrival = moment().add(minsAway, "minutes").format("HH:mm");

    //Creating the new row of data for the train schedule display
    var newRow = $("<tr>").append(
        $("<td id=data-name>").text(trainName),
        $("<td id=data-destination>").text(destination),
        $("<td id=data-frequency>").text(frequency),
        $("<td id=data-next-arrival>").text(nextArrival),
        $("<td id=data-minutes-away>").text(minsAway)
    );

    //Appending the new row to the table.
    $("tbody").append(newRow);

    // Creating error object function to track errors in console should they occur
}, function (errorObject) {
    console.log("Error: " + errorObject);
});