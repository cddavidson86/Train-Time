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
  var trainTime = "";
  var trainFrequency = "";

  $("#add-train").on("click", function() {
    event.preventDefault();
    trainName = $("#train-name").val().trim();
    trainDestination = $("#train-destination").val().trim();
    trainTime = $("#train-time").val().trim();
    trainFrequency = $("#train-frequency").val().trim();

    firebase.database().ref().set({
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency
    })
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);
  })