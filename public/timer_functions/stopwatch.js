import { postNewTimeblockToServer } from "../data_functions/getAndPostTimeBlocks.js";

var startTime;

// Function that either starts the timer for a given category, or stops the timer for the given category and sents it to Mr Server
function timer(action, category, categoryNice, colour) {
  // Timer takes an action and a category
  if (action === "start") {
    // make start time current time, start the timer
    startTime = Date.now();
    increment();
    console.log(`Timer: starting ${category}`);
  } else if (action === "stop") {
    // post the new time-block to the server and erase the start time
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    postNewTimeblockToServer(
      category,
      categoryNice,
      colour,
      startTime,
      endTime,
      elapsedTime
    );
    console.log(
      `Timer: posting to server ${category}, ${startTime}, ${endTime}, ${elapsedTime}`
    );
  }
}

// Function to find the current elapsed time and post it as a time string to its target visualisation
function increment() {
  setTimeout(function () {
    let elapsedTime = Date.now() - startTime;

    var hours = Math.floor(elapsedTime / 1000 / 60 / 60);
    if (hours <= 9) {
      hours = "0" + hours;
    }

    var mins = Math.floor(elapsedTime / 1000 / 60) % 60;
    if (mins <= 9) {
      mins = "0" + mins;
    }

    var secs = Math.floor(elapsedTime / 1000) % 60;
    if (secs <= 9) {
      secs = "0" + secs;
    }
    let timeString = `${hours}:${mins}:${secs}`;
    try {
      document.querySelector(".visualise-time-here").innerText = timeString;
      increment();
    } catch (error) {}
  }, 100);
}

export { timer, increment };
