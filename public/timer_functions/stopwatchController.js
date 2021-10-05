import getElement from "../utilities/getElement.js";
import { timer } from "./stopwatch.js";

let startStopButtons = [...document.querySelectorAll(".timer-start-stop-btn")];

function startStopEventListener(startStopButton) {
  startStopButton.addEventListener("click", function (e) {
    const thisTimer = e.target.parentElement.parentElement;
    const thisTimerId = thisTimer.id;

    const thisTimerCategoryNice =
      thisTimer.querySelector(".timer-title").innerText;
    const thisTimerColour = "red"; // TODO

    // Is a timer currently running? Is THIS timer currently running?
    let timerIsRunning = false;
    let thisTimerIsRunning = false;
    let runningTimerId;
    let runningTimerCategoryNice;
    let runningTimerColor;
    let runningTimer;

    if ([...document.querySelectorAll(".visualise-time-here")].length > 0) {
      timerIsRunning = true;

      // Which timer?
      runningTimer = getElement(".visualise-time-here").parentElement
        .parentElement;
      runningTimerId = runningTimer.id;
      runningTimerCategoryNice =
        runningTimer.querySelector(".timer-title").innerText;
      runningTimerColor = "red"; // TODO
    }
    if (thisTimerId === runningTimerId) {
      thisTimerIsRunning = true;
    }

    // Decide what to do
    if (!timerIsRunning) {
      // No timer running, start timer
      console.log("no timer running, start this timer");
      vizcontroller("start", thisTimerId);
      timer("start", thisTimerId, thisTimerCategoryNice, thisTimerColour);
    } else if (thisTimerIsRunning) {
      // This timer running, stop timer
      vizcontroller("stop", thisTimerId);
      console.log(`stopping ${thisTimerId}`);
      timer("stop", thisTimerId, thisTimerCategoryNice, thisTimerColour);
    } else if (!thisTimerIsRunning) {
      // Other timer running, stop other timer, start this timer
      console.log(`stopping ${runningTimerId}, starting ${thisTimerId}`);
      vizcontroller("start", thisTimerId);
      timer(
        "stop",
        runningTimerId,
        runningTimerCategoryNice,
        runningTimerColour
      );
      timer("start", thisTimerId), thisTimerCategoryNice, thisTimerColour;
    }
  });
}

startStopButtons.forEach((startStopButton) => {
  startStopEventListener(startStopButton);
});

/*
For each startStop button 
- Add event listener 

--- Detect if something is already running 
--- Detect what it is that is already running
--- 



1. The timer controls itself and posts to the server 
2. The event listener simply tells the  timer what to do ("action", "category")

--- timer(start, category) = timer makes start time now, makes category the category
--- timer(stop, category) = timer posts to the server, erases start time 


3. The visualisation controller adds the "visualised-time-here" class to a single target timer element and turns every other timer element into its "total" value  

*/

function vizcontroller(action, timerID) {
  const allTimers = [...document.querySelectorAll(".timer-time")];
  const allButtons = [...document.querySelectorAll(".timer-start-stop-btn")];
  console.log(`All elements: `, allTimers);
  const thisTimer = document.getElementById(timerID);
  const thisTimerDisplay = thisTimer.querySelector(".timer-time");
  const thisTimerButton = thisTimer.querySelector(".timer-start-stop-btn");

  // Eliminate all current timer visualisations
  try {
    document
      .querySelector(".visualise-time-here")
      .classList.remove("visualise-time-here");
  } catch {}
  // Make all timers show totals
  allTimers.forEach((timer) => {
    timer.innerText = "TOTAL";
  });
  allButtons.forEach((button) => {
    button.innerText = "Start";
  });

  if (action === "start") {
    // One timer running. Make all other timers display their totals
    thisTimerDisplay.classList.add("visualise-time-here");
    thisTimerButton.innerText = "Stop";
  }
}

export default startStopEventListener;
