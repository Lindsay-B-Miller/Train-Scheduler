// Initialize Firebase
var config = {
    apiKey: "AIzaSyB7UhrGJhpIqbszUt5nTGLnrAkagTALbIY",
    authDomain: "train-tracker-b103f.firebaseapp.com",
    databaseURL: "https://train-tracker-b103f.firebaseio.com",
    projectId: "train-tracker-b103f",
    storageBucket: "",
    messagingSenderId: "112135017172",
    appId: "1:112135017172:web:21a9154c45a9638ad72141"
};

firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Initial Values
var newTrainName = "";
var newDestination = "";
var newTrainTime = "";
var newFrequency = "";
var arrivalTimes = [];




$("#button").on("click", function () {
    event.preventDefault();
    newTrainName = $("#train-name").val().trim();
    newDestination = $("#destination").val().trim();
    newTrainTime = $("#first-train-time").val().trim();
    newFrequency = $("#frequency").val().trim();

    // NEXT ARRIVAL AND MINUTES AWAY
    // Array of times train arrives on a given day

    // Convert first train time to minutes from midnight
    // var firstTrainTimeMinutes = moment("00:00:00", )


    var format = "HH:mm";
    var convertedTime = moment(newTrainTime, format);
    var midnight = "00:00";
    moment.utc(moment(convertedTime, "HH:mm").diff(moment(midnight, "HH:mm")))

    // var iterationsUntilMidnight = (newFrequency

    // for (var i = 0; i <)

    //     arrivalTimes = (newTrainTime

    // Truncate array at 23:59
    var convertedTime = moment(sv.newTrainTime, format);
    var minutes = (1440 - (moment.duration(convertedTime.format("HH:mm")).asMinutes()));
    console.log(minutes);
    var numberArrivals = (minutes / sv.newFrequency)
    console.log(numberArrivals);
    for (i = 0; i < numberArrivals; i++) {
        console.log(moment.utc(moment.duration((sv.frequency * [i]), "minutes").asMilliseconds()).format("HH:mm"))
        // console.log(sv.newTrainTime + 
    }

    // Find value closest to right now

    // Push variables to Firebase
    database.ref().push({
        newTrainName: newTrainName,
        newDestination: newDestination,
        newTrainTime: newTrainTime,
        newFrequency: newFrequency,
        // newNextArrival: newNextArrival,
        // newMinutesAway: newMinutesAway

    });
});

// Firebase watcher .on("child_added")
database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();

    // Console log the last input
    console.log(sv.newTrainName);
    console.log(sv.newDestination);
    console.log(sv.newTrainTime);
    console.log(sv.newFrequency);
    // console.log(sv.newNextArrival);
    // console.log(sv.newMinutesAway);

    // Change HTML to Firebase info
    var row = $("<tr>");
    var name = $("<td>")
    name.append(sv.newTrainName);
    row.append(name);
    var destination = $("<td>")
    destination.append(sv.newDestination);
    row.append(destination);
    var frequency = $("<td>")
    frequency.append(sv.newFrequency);
    row.append(frequency);
    var nextArrival = $("<td>");
    nextArrival.append(sv.newNextArrival);
    row.append(nextArrival);
    var minutesAway = $("<td>");
    minutesAway.append(sv.newMinutesAway);
    row.append(minutesAway);





    $("tbody").append(row);


},
    // Handle the errors
    function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });


