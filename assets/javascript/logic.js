// $(document).ready(function(){


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBStdrNBVnEycFmmvniaa-mA0G8VCuDoXo",
    authDomain: "train-8c6b5.firebaseapp.com",
    databaseURL: "https://train-8c6b5.firebaseio.com",
    projectId: "train-8c6b5",
    storageBucket: "",
    messagingSenderId: "169397402186"
};

firebase.initializeApp(config);

var database = firebase.database();

	var trainName = "";
	var trainDestination = "";
	var firstTrain = "";
	var freq = "";

  // Submit train info
$("#add-train-btn").on("click", function(event) {
	event.preventDefault();

	// user input
	trainName = $("#train-name-input").val().trim();
	trainDestination = $("#destination-input").val().trim();
	firstTrain = moment($("#first-train-input").val().trim());
	freq = $("#frequency-input").val().trim();

	// object to hold data
	var newTrain = {
		name: trainName,
		destination: trainDestination,
		first: firstTrain,
		frequency: freq,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	};

	// Uploads train data to the database
	database.ref().push(newTrain);

	console.log("Train Name: " + newTrain.name);
	console.log("Destination: " + newTrain.destination);
	console.log("First Train Time: " + newTrain.first);
	console.log("Frequency (min): " + newTrain.frequency);

	// Clears all of the text-boxes
	$("#train-name-input").val("");
	$("#destination-input-input").val("");
	$("#first-train-input").val("");
	$("#frequency-input").val("");

});


    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("child_added", function(childsnapshot, preChildKey) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val());
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().first);
      console.log(childSnapshot.val().frequency);



         }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);

      //calculate next train time
    var tFrequency = freq;

    // first time
    var firstTime = firstTrain;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

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
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

	// Add each train's data into the table
	$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + freq + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});

// });




	// Create Firebase event for adding train data to the database and a row in the html when a user adds an entry
	// database.ref().on("child_added", function(childSnapshot) {

	// console.log(childSnapshot.val());

	// // Store everything into a variable.
	// var trainName = childSnapshot.val().name;
	// var trainDestination = childSnapshot.val().destination;
	// var firstTrain = childSnapshot.val().first;
	// var freq = childSnapshot.val().frequency;

	// console.log(trainName);
	// console.log(trainDestination);
	// console.log(firstTrain);
	// console.log(freq);

	
	// });
// });

// });

