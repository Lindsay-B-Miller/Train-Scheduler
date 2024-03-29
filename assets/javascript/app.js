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
var nextArrival;
var minutesAway;





$("#button").on("click", function () {
    event.preventDefault();
    newTrainName = $("#train-name").val().trim();
    newDestination = $("#destination").val().trim();
    newTrainTime = $("#first-train-time").val().trim();
    newFrequency = $("#frequency").val().trim();


    // Push variables to Firebase
    database.ref().push({
        newTrainName: newTrainName,
        newDestination: newDestination,
        newTrainTime: newTrainTime,
        newFrequency: newFrequency,

    });
});

// Firebase watcher .on("child_added")
database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();

    // get difference of current time and start time = chunk of time in minutes
    var format = "HH:mm";
    var difference;
    var minutesTillTrain;
    var nextTrain;

    var convertedTime = moment(sv.newTrainTime, format);
    var arrivalMinutes = (moment.duration(convertedTime.format("HH:mm")).asMinutes());
    var currentMinutes = (moment.duration(moment().format("HH:mm")).asMinutes());
    if (currentMinutes >= arrivalMinutes) {
        difference = (currentMinutes - arrivalMinutes);
        // console.log(arrivalMinutes);
        // console.log("current minutes: " + currentMinutes);
        // console.log("diff between now minutes and arriavla minutes: " + difference);

        //divide diff by frequency get remainder
        var remainder = (difference % sv.newFrequency)
        console.log("remainder: " + remainder);
        //subtract that remainder from frequency = gives us # of minutes to next train
        minutesTillTrain = (sv.newFrequency - remainder);
        console.log("Minutes till train: " + minutesTillTrain);
        // add that to moment()
        var nextTrainMinutes = (currentMinutes + minutesTillTrain);
        console.log("next train minutes: " + nextTrainMinutes);
        nextTrain = moment().add(minutesTillTrain, "minutes").format("h:mm A");
    }
    else {
        minutesTillTrain = (arrivalMinutes - currentMinutes);
        nextTrain = moment().add(minutesTillTrain, "minutes").format("h:mm A");
    }


    // Console log the last input
    console.log("train name: " + sv.newTrainName);
    console.log("dest: " + sv.newDestination);
    console.log("start time: " + sv.newTrainTime);
    console.log("freq: " + sv.newFrequency);


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
    nextArrival.append(nextTrain);
    row.append(nextArrival);
    var minutesAway = $("<td>");
    minutesAway.append(minutesTillTrain);
    row.append(minutesAway);



    $("tbody").append(row);


    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});




