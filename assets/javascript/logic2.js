var config = {
    apiKey: "AIzaSyBStdrNBVnEycFmmvniaa-mA0G8VCuDoXo",
    authDomain: "train-8c6b5.firebaseapp.com",
    databaseURL: "https://train-8c6b5.firebaseio.com",
    projectId: "train-8c6b5",
    storageBucket: "train-8c6b5.appspot.com",
    messagingSenderId: "169397402186"
  };
  firebase.initializeApp(config);

  var dataRef = firebase.database();

    var train="";
    var destination ="";
    var firstTrain = "";
    var freq = "";


  $("#add-train-btn").on("click", function(event) {
      event.preventDefault();

  train = $("#train-name-input").val().trim();
  destination = $("#destination-input").val().trim();
  firstTrain = parseInt($("#first-train-input").val().trim());;
  freq = parseInt($("#frequency-input").val().trim());;

dataRef.ref().push({       
      name: train,
      destination: destination,
      firstTrain: firstTrain,
      frequency: freq,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
       });
    });

dataRef.ref().on("child_added", function (childSnapshot){

// console.log(childSnapshot.val().name);
// console.log(childSnapshot.val().destination);
// console.log(childSnapshot.val().firstTrain);
// console.log(childSnapshot.val().frequency);

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequencyNew = childSnapshot.val().frequency;

  console.log("Train Name: " + trainName);
  console.log("Train Destination: " + trainDestination);
  console.log("First Train: " + firstTrain + ":00");
  console.log("Frequency: " + frequencyNew + " minutes");

      //calculate next train time
    var tFrequency = frequencyNew;
    console.log("Frequncy of Train: " + tFrequency);

    // first time
    var firstTime = firstTrain;
    console.log("First arrival time: " + firstTime);

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + frequencyNew + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");


  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);



});