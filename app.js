$(document).ready(function() {
    var config = {
    apiKey: "AIzaSyCafVsPaIWWNFKImMZ4eH_i8cqwiNbXg4A",
    authDomain: "fbase-first-project.firebaseapp.com",
    databaseURL: "https://fbase-first-project.firebaseio.com",
    projectId: "fbase-first-project",
    storageBucket: "fbase-first-project.appspot.com",
    messagingSenderId: "173552719130",
    appId: "1:173552719130:web:1e8a1d1a42e01fa8cc48a3",
    measurementId: "G-NXXTWZFBCQ"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  var userData;
  $("#submitNewInfo").click(function(e) {
    e.preventDefault();
    var name = $("#addName").val();
    var role = $("#jobTitle").val();
    var date = $("#joinDate").val();
    var salary = $("#monthlyRate").val();

    database.ref().push({
      name: name,
      role: role,
      startDate: date,
      salary: salary
    });
    alert("Employee Added Successfully!");
    $("input").val("");
  });
  database.ref().on("child_added", function(snapshot) {
    userData = snapshot.val();
    var today = moment().format("YYYYMMDD");
    var months = Math.floor(
      moment(today).diff(moment(userData.startDate), "months", true)
    );
    var totalBilled = months * userData.salary;
    $("#tableBody").append("<tr>");
    $("#tableBody tr:last-child").append(
      $("<td>" + userData.name + "</td>"),
      $("<td>" + userData.role + "</td>"),
      $("<td>" + userData.startDate + "</td>"),
      $("<td>" + months + "</td>"),
      $("<td>" + userData.salary + "</td>"),
      $("<td>" + totalBilled + "</td>")
    );
  });
    $("#clearInfo").click(function (e) { 
        e.preventDefault();
        database.ref().remove();
        $("#tableBody").empty();
    });
});
