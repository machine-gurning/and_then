// function to get current time

function fillZero(number) {
  if (number < 10) {
    return "0" + number;
  } else {
    return number;
  }
}

function display_c() {
  var refresh = 1000;
  myTime = setTimeout("display_ct()", refresh);
}

function display_ct() {
  var date = new Date();

  if (date.getHours() < 12) {
    var AMPM = "AM";
  } else {
    var AMPM = "PM";
  }

  var time =
    fillZero(date.getHours()) +
    ":" +
    fillZero(date.getMinutes()) +
    ":" +
    fillZero(date.getSeconds()) +
    " " +
    AMPM;

  document.getElementById("LiveTime").innerHTML = time;
  display_c();
}
