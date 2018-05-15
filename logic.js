var config = {
    apiKey: "AIzaSyCmVjS52U0sCl-QlyKloFRLF297w0xr-rc",
    authDomain: "train-homework-48978.firebaseapp.com",
    databaseURL: "https://train-homework-48978.firebaseio.com",
    projectId: "train-homework-48978",
    storageBucket: "",
    messagingSenderId: "755132290698"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var name, destination, firstTime, frequency;

  $("#submit").on("click", function(event) {
      event.preventDefault();

      name = $("#eName").val().trim();
      destination = $("#destination").val().trim();
      firstTime = $("#time").val().trim();
      frequency = $("#frequency").val();

      database.ref().push({
          name: name,
          destination: destination,
          firstTime: firstTime,
          frequency: parseInt(frequency)
      })

      $("#eName").val("");
      $("#destination").val("");
      $("#time").val("");
      $("#frequency").val("");      
  })

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    var sv = snapshot.val();

    var firstTimeConverted = moment(sv.firstTime, "HH:mm").subtract(1, "years");
    var timeSince = moment().diff(moment(firstTimeConverted), "minutes");
    var timeSinceConvert = timeSince % sv.frequency;    
    var minTill = sv.frequency - timeSinceConvert;
    var nextArrival = moment().add(minTill, "minutes").format("HH:mm");

    // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // var tRemainder = diffTime % tFrequency;
    // var tMinutesTillTrain = tFrequency - tRemainder;
    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");


    $("#train-table").append("<tr><td>" + sv.name + "</td><td>" + sv.destination + "</td><td>"
      + sv.frequency + "</td><td>" + nextArrival + "</td><td>" + minTill + "</td></tr>")
});
