 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyAY5bjChqi_ag3CUo8JI7skWsuWFvUrrYU",
    authDomain: "train-times-20c72.firebaseapp.com",
    databaseURL: "https://train-times-20c72.firebaseio.com",
    projectId: "train-times-20c72",
    storageBucket: "train-times-20c72.appspot.com",
    messagingSenderId: "556536970294",
    appId: "1:556536970294:web:6064112662b27f26"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  var trainName = "";
  var trainDestination = "";
  var trainFrequency = "";
  var trainFirstTime = "";
  var nextArrival = "";
  var minutesAway = "";

  $("#add-train").on("click", function(event) {
    event.preventDefault();
    trainName = $("#train-name").val().trim();
    trainDestination = $("#train-destination").val().trim();
    trainFirstTime = $("#train-time").val().trim();
    trainFrequency = $("#train-frequency").val().trim();
    workTime();

    firebase.database().ref().push({
        name: trainName,
        destination: trainDestination,
        frequency: trainFrequency,
        away: nextArrival,
        remaining: minutesAway,
        trainFirst: trainFirstTime
    })
    // console.log("-----------------");
    // console.log("inside on.click")
    // console.log("time " +trainName);
    // console.log("Destination " +trainDestination);
    console.log("Frenquency " +trainFrequency);
    // console.log("trainFirstTime " +trainFirstTime);
    // console.log("nextArrival " +nextArrival);
    // console.log("minutesAway " +minutesAway);
    $("#train-name").val('');
    $("#train-destination").val('');
    $("#train-frequency").val('');
    $("#train-time").val('');
  })

  firebase.database().ref().on("child_added", function(snapshot){
    workTime();
    var tableRow = $("<tr>");
    tableRow.append("<td>"+snapshot.val().name+"</td>");
    tableRow.append("<td>"+snapshot.val().destination+"</td>");
    tableRow.append("<td>"+snapshot.val().frequency+"</td>");
    tableRow.append("<td>"+snapshot.val().remaining+"</td>");
    tableRow.append("<td>"+snapshot.val().away+"</td>");
    $("tbody").prepend(tableRow);

    // console.log("-----------------");
    // console.log("inside child added")
    // console.log("time " +trainName);
    // console.log("Destination " +trainDestination);
    console.log("Frenquency " +trainFrequency);
    // console.log("trainFirstTime " +trainFirstTime);
    // console.log("nextArrival " +nextArrival);
    // console.log("minutesAway " +minutesAway);
  })

  function workTime() {

    // Assumptions
    var tFrequency = trainFrequency;

    // Time is 3:30 AM
    // var firstTime = "03:30;"

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(trainFirstTime, "HH:mm").subtract(1, "years");
    console.log("First time converted " +firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log("The remainder " +tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    nextArrival = tMinutesTillTrain;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    minutesAway = moment(nextTrain).format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // console.log("-----------------");
    // console.log("inside worktime()")
    // console.log("time " +trainName);
    // console.log("Destination " +trainDestination);
    // console.log("Frenquency " +trainFrequency);
    // console.log("trainFirstTime " +trainFirstTime);
    // console.log("nextArrival " +nextArrival);
    // console.log("minutesAway " +minutesAway);
    // console.log("*****************");
  }