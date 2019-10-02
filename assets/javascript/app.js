// Initialize Firebase
var config = {
    apiKey: "AIzaSyD0FKx_tpPanpfmuh0yDd5rDVc_P5TqwXI",
    authDomain: "fir-project-96028.firebaseapp.com",
    databaseURL: "https://fir-project-96028.firebaseio.com",
    projectId: "fir-project-96028",
    storageBucket: "",
    messagingSenderId: "359662097807",
    appId: "1:359662097807:web:7dd1352a6b5c3230f1e7fa"

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

    // First arrival (pushed back 1 year to make sure it comes before current time)
    var firstArrivalConverted = moment(newTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstArrivalConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstArrivalConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % newFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var newMinutesAway = newFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + newMinutesAway);


    // Next Train
    var newNextArrival = moment().add(newMinutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(newNextArrival).format("hh:mm"));

    // Push variables to Firebase
    database.ref().push({
        newTrainName: newTrainName,
        newDestination: newDestination,
        newTrainTime: newTrainTime,
        newFrequency: newFrequency,
        newNextArrival: newNextArrival,
        newMinutesAway: newMinutesAway

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
    console.log(sv.newNextArrival);
    console.log(sv.newMinutesAway);

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
    // var nextArrival = $("<td>");
    // nextArrival.append(sv.newNextArrival);
    // row.append(nextArrival);
    // var minutesAway = $("<td>");
    // minutesAway.append(sv.newMinutesAway);
    // row.append(minutesAway);





    $("tbody").append(row);


},
    // Handle the errors
    function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });


