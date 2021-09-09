const categories = document.querySelectorAll(".category");

let runningCategory = "noRunningCategory"; // Set to active category
let clickedCategory = "noClickedCategory"; // Set to category that the user just clicked
let timerDisplayCategory = "noTimerDisplayCategory"; // Where, if anywhere, the timer is currently being displayed
let warning = "noWarning";
let silence = false;

let exportStartTime;
let exportEndTime;
let exportElapsedTime;
let exportCategory;
let time = 0;

// Listening for click
for (let i = 0; i < categories.length; i++) {
  categories[i].addEventListener("click", function () {
    let category = categories[i];
    timerControl(category);
  });
}

// Escape key cancels the double check warning
// TODO esacpe key also stops the timer if you click it twice or whatever
function escapePress(e) {
  if (e.key === "Escape") {
  }
}

// Timer control
function timerControl(category) {
  clickedCategory = category.id;

  // Creating variables for the selected category and currently running category

  var clickedParent = document.querySelector("#" + category.id);
  var clickedMessage = clickedParent.querySelector(".category-time");
  if (runningCategory != "noRunningCategory") {
    var runningParent = document.querySelector("#" + runningCategory);
    var runningMessage = runningParent.querySelector(".category-time");
  }

  if (runningCategory === "noRunningCategory") {
    // No timer is running, simply start the timer

    runningCategory = clickedCategory;
    timerDisplayCategory = clickedCategory;

    exportStartTime = Date.now();

    reset();
    start();
  } else if (runningCategory != "noRunningCategory") {
    // A timer is currently running

    if (clickedCategory === runningCategory) {
      // User is clicking the category that has already started
      if (warning === clickedCategory) {
        // User has seen the warning, stop the timer
        runningCategory = "noRunningCategory";
        timerDisplayCategory = "noTimerDisplayCategory";

        warning = "noWarning";

        exportEndTime = Date.now();
        exportCategory = clickedCategory;
        exportElapsedTime = elapsedTime;

        console.log(
          `Start: ${exportStartTime}, End: ${exportEndTime}, Elapsed: ${exportElapsedTime}, Category: ${exportCategory}`
        );

        clickedMessage.innerHTML = "TOTAL";
        reset();
        postNewTimeblockToServer(
          exportCategory,
          exportStartTime,
          exportEndTime,
          exportElapsedTime
        );
      } else if (warning != "noWarning") {
        // Some other category has a warning displayed

        // Erase the other category's warning
        document
          .querySelector("#" + warning)
          .querySelector(".category-time").innerHTML = "TOTAL";

        // Change the warning to this category
        warning = clickedCategory;
        timerDisplayCategory = "noTimerDisplayCategory";
        clickedMessage.innerHTML = "STOP?";
      } else {
        // Show the warning
        warning = clickedCategory;
        timerDisplayCategory = "noTimerDisplayCategory";
        clickedMessage.innerHTML = "STOP?";
      }
    } else {
      // User is clicking a category different to the currently running one
      if (warning === clickedCategory) {
        // Warning displayed. Interrupt one timer, start the other

        runningMessage.innerHTML = "TOTAL";

        exportCategory = runningCategory;
        warning = "noWarning";
        exportElapsedTime = elapsedTime;
        exportEndTime = Date.now();

        console.log(
          `Start: ${exportStartTime}, End: ${exportEndTime}, Elapsed: ${exportElapsedTime}, Category: ${exportCategory}`
        );

        reset();
        start();
        postNewTimeblockToServer(
          exportCategory,
          exportStartTime,
          exportEndTime,
          exportElapsedTime
        );

        timerDisplayCategory = clickedCategory;
        runningCategory = clickedCategory;
        exportCategory = clickedCategory;
        exportStartTime = Date.now();
      } else if (warning === runningCategory) {
        // User showed warning on the running category then changed his mind
        warning = clickedCategory;
        clickedMessage.innerHTML = "START?";
        timerDisplayCategory = runningCategory;
      } else if (warning != "noWarning") {
        // User showed warning on a different category then changed his mind
        // change the warning back to whatever was displayed before
        document
          .querySelector("#" + warning)
          .querySelector(".category-time").innerHTML = "TOTAL";

        // Reassign the warning
        warning = clickedCategory;
        // Display the warning for the clicked category
        clickedMessage.innerHTML = "START?";
      } else {
        // No warnings currently displayed, display one for what has been clicked

        warning = clickedCategory;
        clickedMessage.innerHTML = "START?";
      }
    }
  }
}

let startTime;
let elapsedTime;
let intervalTimer;

function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let formattedHH = hh.toString().padStart(2, "0");
  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

function start() {
  startTime = Date.now();
  intervalTimer = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    if (timerDisplayCategory === "noTimerDisplayCategory") {
    } else {
      document
        .querySelector("#" + timerDisplayCategory)
        .querySelector(".category-time").innerHTML = timeToString(elapsedTime);
    }
  }, 1000);
}

function reset() {
  clearInterval(intervalTimer);
  elapsedTime = 0;
}

// Request function

const urlsecret = "api/v1/timeblocks";

function postNewTimeblockToServer(category, startTime, endTime, elapsedTime) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", urlsecret, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      category: category,
      startTime: startTime,
      endTime: endTime,
      elapsedTime: elapsedTime,
    })
  );
}
