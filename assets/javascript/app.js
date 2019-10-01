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

    // Time away calculation



    // Push variables to Firebase
    database.ref().push({
        newTrainName: newTrainName,
        newDestination: newDestination,
        newTrainTime: newTrainTime,
        newFrequency: newFrequency
    });
});

// Firebase watcher .on("child_added")
database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();

    // Console log the last input
    console.log(sv.newTrainName)
    console.log(sv.newDestination)
    console.log(sv.newTrainTime)
    console.log(sv.newFrequency)

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

    // Find value closest to right now

    // Push that value to Next Arrival

    // Calculate minutes between Next Arrival and now

    // Push this value to Minutes Away




    $("tbody").append(row);


},
    // Handle the errors
    function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });


