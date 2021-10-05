import getElement from "../utilities/getElement.js";

// function to get current time

function fixZero(k) {
  if (k < 10) {
    return "0" + k;
  } else {
    return k;
  }
}

function currentTime() {
  let date = new Date();
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();

  let ampm = "AM";
  if (hour >= 12) {
    ampm = "PM";
  }

  hour = fixZero(hour);
  min = fixZero(min);
  sec = fixZero(sec);

  const displayTime = hour + ":" + min + ":" + sec + " " + ampm;
  return displayTime;
}

function globalTime() {
  let liveTime = currentTime();
  document.querySelector(".live-time").textContent = liveTime;

  setTimeout(globalTime, 1000);
}

globalTime();
