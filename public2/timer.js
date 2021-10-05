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
  var clickedMessage = document
    .querySelector("#" + category.id)
    .querySelector(".category-time");
  if (runningCategory != "noRunningCategory") {
    var runningMessage = document
      .querySelector("#" + runningCategory)
      .querySelector(".category-time");
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

////////////////////////////////////////////////////////
//////////////  database functions  ////////////////////
////////////////////////////////////////////////////////

const URL = "api/v1/timeblocks";
// POST NEW BLOCK TO SERVER
function postNewTimeblockToServer(category, startTime, endTime, elapsedTime) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", URL);
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

async function getAndExpandTimeblocks(URL) {
  // Get timeblocks
  const data = await fetch(URL);
  allData = await data.json();
  return allData;
}

function expandTimeblocks(allData) {
  var startTimes = [];

  // Expand start and end times
  allData.map((item) => {
    startTimeDateObject = new Date(item.startTime);
    endTimeDateObject = new Date(item.endTime);

    item.startYear = startTimeDateObject.getFullYear();
    item.startMonth = startTimeDateObject.getMonth();
    item.startDay = startTimeDateObject.getDate();
    item.startHour = startTimeDateObject.getHours();
    item.startMinute = startTimeDateObject.getMinutes();
    item.startSecond = startTimeDateObject.getSeconds();

    item.endYear = endTimeDateObject.getFullYear();
    item.endMonth = endTimeDateObject.getMonth();
    item.endDay = endTimeDateObject.getDate();
    item.endHour = endTimeDateObject.getHours();
    item.endMinute = endTimeDateObject.getMinutes();
    item.endSecond = endTimeDateObject.getSeconds();

    // Check for multi-day blocks
    if (item.startDay !== item.endDay) {
      item.multiday = true;
    } else {
      item.multiday = true;
    }
    //TODO: figure this out

    // Add "percentage through day" for start and end
    // TODO: change according to limits of the day
    item.startPercentage =
      item.startHour / 24 +
      item.startMinute / 24 / 60 +
      item.startSecond / 24 / 60 / 60;

    item.endPercentage =
      item.endHour / 24 +
      item.endMinute / 24 / 60 +
      item.endSecond / 24 / 60 / 60;

    item.elapsedPercentage = item.endPercentage - item.startPercentage;

    item.elapsedPercentageRounded =
      Math.round(item.elapsedPercentage * 1000000) / 1000000;
    item.startPercentageRounded =
      Math.round(item.startPercentage * 1000000) / 1000000;
    item.endPercentageRounded =
      Math.round(item.endPercentage * 1000000) / 1000000;

    // This will be matched with the ID of the column in the UI
    item.columnIdString =
      String(item.startYear) +
      "-" +
      String(item.startMonth) +
      "-" +
      String(item.startDay);

    startTimes.push(new Date(item.startTime));
  });

  // Find earliest time

  var minTime = new Date(Math.min.apply(null, startTimes));

  // Construct list of dates between earliest and today

  datesList = [];

  var maxTime = new Date();
  var minTimeYear = minTime.getFullYear();
  var minTimeMonth = minTime.getMonth();
  var minTimeDay = minTime.getDate();

  for (
    var d = new Date(minTimeYear, minTimeMonth, minTimeDay);
    d <= maxTime;
    d.setDate(d.getDate() + 1)
  ) {
    datesList.push(new Date(d));
  }

  // Reverse the order
  datesList.reverse();

  var columnHTML = "";
  // Build empty columns for each date
  for (let i in datesList) {
    columnHTML += buildDateColumnHTML(datesList[i]);
  }
  document.querySelector(".left-container").innerHTML = columnHTML;

  // Add the timebar to today's column
  var timebarHTML = `<div class="time-bar"></div> <div class="inner-block-container">
  </div>`;

  document.querySelector(".outer-block-container").innerHTML = timebarHTML;
  // Populate each column with their timeblocks

  for (let i in allData) {
    // Establish all attributes which will be inserted into timeblock
    var databaseId = allData[i]._id;
    var id = allData[i].columnIdString;
    var categoryName = allData[i].category;
    var startPercentage = allData[i].startPercentageRounded;
    var endPercentage = allData[i].endPercentageRounded;
    var elapsedPercentage = allData[i].elapsedPercentageRounded;

    // Create HTML of block
    // TODO fix this asynchronos BS here
    var blockHTML =
      `<div class="block" category="` +
      String(categoryName) +
      `" startPercentage="` +
      String(startPercentage) +
      `" endPercentage="` +
      String(endPercentage) +
      `" elapsedPercentage="` +
      String(elapsedPercentage) +
      `" id="` +
      String(databaseId) +
      `"></div>`;
    // Append the block in the correct day's container
    document
      .getElementById(String(id))
      .querySelector(".outer-block-container")
      .querySelector(".inner-block-container").innerHTML += blockHTML;
  }
}

// Takes a Date object and returns the HTML for that date column
function buildDateColumnHTML(date) {
  // Make day ID
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const idString = String(year) + "-" + String(month) + "-" + String(day);

  // Make day title
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthString = monthNames[month];
  const dayTitleString = String(monthString) + " " + String(day);

  const columnHTMLString =
    `<div class="column-container" id = "` +
    idString +
    `">
              <div class="date">` +
    dayTitleString +
    `</div>
              <div class="outer-block-container">
                <div class="inner-block-container">
                </div>
              </div>
            </div>`;
  return columnHTMLString;
}

function findAndUpdate(allData) {}

function calculateAllTimeTotal(allData) {}

getAndExpandTimeblocks(URL).then((allData) => {
  expandTimeblocks(allData);
  console.log(allData);
  resizeTimeblocks();
});

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
////////////////////////// R E S I Z E R ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// Timer to avoid too many calls
var globalResizeTimer = null;

// Function to scale time-bar and blocks
function scaleEverything() {
  placeTimeBar();
  resizeTimeblocks();
}

// scale everything upon page resize but don't spam it
window.addEventListener("resize", () => {
  if (globalResizeTimer != null) window.clearTimeout(globalResizeTimer);
  globalResizeTimer = window.setTimeout(scaleEverything, 200);
});

// Function to refresh time-bar location every 20 seconds
function refreshTimeBar() {
  var refresh = 20000;
  myTime = setTimeout("placeTimeBar()", refresh);
}

function placeTimeBar() {
  // TODO allow sub-section of day to be displayed, with start and end times

  // 1. Find current portion of day
  var date = new Date();
  var currentTimeFraction =
    date.getHours() / 24 +
    date.getMinutes() / 60 / 24 +
    date.getSeconds() / 60 / 60 / 24;

  // 2. Convert into portion of page size
  var timelineHeight = document.querySelector(
    ".outer-block-container"
  ).clientHeight;

  var offsetFromTop = Math.round(timelineHeight * currentTimeFraction);

  // 3. Change "Top" CSS attribute
  //console.log(offsetFromTop);

  document.querySelector(".time-bar").style.top = offsetFromTop + "px";

  refreshTimeBar();
}

var timeblocks;

// Function to scale all blocks
function resizeTimeblocks() {
  // Find total timeline height
  var timelineHeight = document.querySelector(
    ".inner-block-container"
  ).clientHeight;

  // Find all timeblocks
  timeblocks = document.querySelectorAll(".block");
  timeblocks.forEach(
    // For each, extract start and end percentages, turn them into box height and offset from top

    (p) => {
      // extract start and elapsed percentages
      var startPercentage = p.getAttribute("startpercentage");
      var elapsedPercentage = p.getAttribute("elapsedpercentage");

      // Calculate offset from top
      var offsetFromTop = Math.round(timelineHeight * startPercentage);

      // Calculate height of block
      var blockHeight = Math.max(
        Math.round(timelineHeight * elapsedPercentage),
        1
      );

      // Apply CSS changes
      p.style.top = String(offsetFromTop) + "px";
      p.style.height = String(blockHeight) + "px";
      p.style.backgroundColor = "red";
    }
  );
}
