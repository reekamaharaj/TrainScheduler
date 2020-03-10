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

let trainName;
let trainDestination;
let firstTrainTime;
let trainFrequency;
let newTrain;
let firstTime;
let time;
let minsAway;
let nextTrain;
let currentTime = moment();
let nextTrainArrival;
let timeDiff;

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
    };
    database.ref().push(newTrain);

    $("#trainName-input").val("");
    $("#trainDestination-input").val("");
    $("#firstTrainTime-input").val("");
    $("#trainFrequency-input").val("");
});

database.ref().on("child_added", function(snapshot){
    trainName = snapshot.val().name;
    trainDestination = snapshot.val().destination;
    trainFrequency = snapshot.val().frequency;
    firstTrainTime = snapshot.val().firstTime;
    console.log(snapshot.val().frequency);
    //0
    console.log(snapshot.val().firstTime);
    //0:00
    firstTime = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTime);
    //object

    time = currentTime.diff(moment(firstTime), "minutes");
    console.log(time);
    //Nan

    timeDiff = time % trainFrequency;
    console.log(timeDiff);
    //Nan

    minsAway = trainFrequency - timeDiff;
    console.log(minsAway);
    //NaN

    nextTrain = moment().add(minsAway, "minutes");
    console.log(nextTrain);
    //object

    nextTrainArrival = moment(nextTrain).format("hh:mm");
    console.log(nextTrainArrival);
    //00:00


    $("thead").append(`
    <tr>
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
//when adding new things, it is shown right, but doesn't come from the database formatted to be displayed
