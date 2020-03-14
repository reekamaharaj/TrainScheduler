var firebaseConfig = {
    apiKey: "AIzaSyDt54c--BF8mnjFVqRfqPgFxLk1gGGqUY8",
    authDomain: "kittyboo-201a0.firebaseapp.com",
    databaseURL: "https://kittyboo-201a0.firebaseio.com",
    projectId: "kittyboo-201a0",
    storageBucket: "kittyboo-201a0.appspot.com",
    messagingSenderId: "1074568465141",
    appId: "1:1074568465141:web:10b2848beaadcc04aad3bc"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

let newTrain;
let trainName;
let trainDestination;
let firstTrainTime;
let trainFrequency;
let firstTime;
let time;
let minsAway;
let nextTrain;
let currentTime = moment();
let nextTrainArrival;
let timeDiff;
let updateData;

$(document).ready(function(){
    $("input.timepicker").timepicker({
        timeFormat: 'HH:mm',
        minTime: '10',
        defaultTime: 'now',
        startTime: '10:00',
        dynamic: false,
        dropdown: false,
        scrollbar: false
    });
});

database.ref().once("value", function(snapshot){
    // rebuild table from database

})

// Capture Button Click
$("#newTrain").on("click", function(event) {
    event.preventDefault();

    trainName = $("#trainName-input").val().trim();
    trainDestination = $("#trainDestination-input").val().trim();
    firstTrainTime = $("#firstTrainTime-input").val().trim();
    trainFrequency = $("#trainFrequency-input").val().trim();

    newTrain = {
        name: trainName,
        destination: trainDestination,
        firstTime: firstTrainTime,
        frequency: trainFrequency,
    }
    database.ref().push(newTrain);

    $("#trainName-input").val("");
    $("#trainDestination-input").val("");
    $("#firstTrainTime-input").val("");
    $("#trainFrequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot){
    trainName = childSnapshot.val().name;
    trainDestination = childSnapshot.val().destination;
    trainFrequency = childSnapshot.val().frequency;
    firstTrainTime = childSnapshot.val().firstTime;
    
    firstTime = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    time = currentTime.diff(moment(firstTime), "minutes");
    timeDiff = time % trainFrequency;
    minsAway = trainFrequency - timeDiff;
    nextTrain = moment().add(minsAway, "minutes");
    nextTrainArrival = moment(nextTrain).format("HH:mm");

    $("thead").append(`
    <tr id = "${childSnapshot.key}">
        <td>${trainName}</td>
        <td>${trainDestination}</td>
        <td>${trainFrequency}</td>
        <td>${nextTrainArrival}</td>
        <td>${minsAway}</td>
    </tr>
    `)

    
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
})