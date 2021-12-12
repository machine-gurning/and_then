import getElement from "../utilities/getElement.js";

function showAndScaleTimeblocks(expandedData) {
  // Create empty columns for each day
  createDayColumns(expandedData);

  // Populate each day's columns with correctly scaled blocks
  insertTimeblocks(expandedData);

  // Change height, offset, colour of each block
  illustrateTimeblocks();
}

// For each timeblock, change height, offset, and colour
function illustrateTimeblocks() {
  // Check height of container
  const currentTimelineHeight = getElement(
    ".inner-block-container"
  ).offsetHeight;

  //
  const timeblocks = [...document.querySelectorAll(".block")];

  timeblocks.forEach((timeblock) => {
    // Extract percentages
    const startFraction = parseFloat(timeblock.getAttribute("startPercentage"));
    const endFraction = parseFloat(timeblock.getAttribute("endPercentage"));

    // Calculate offset and height in pixels
    const startPixelsFromTop = Math.floor(
      startFraction * currentTimelineHeight
    );
    const endPixelsFromTop = Math.floor(endFraction * currentTimelineHeight);

    const blockHeight = Math.max(1, endPixelsFromTop - startPixelsFromTop);

    // Apply the offset and height
    timeblock.style.height = blockHeight + "px";
    timeblock.style.top = endPixelsFromTop + "px";

    // TODO Apply colour
    timeblock.style.backgroundColor = "red";
  });
}

// For each block in the dataset
// -- Calculate the height of the block
// -- Calculate the offset from the top
// -- Create the block, place it in the column
function insertTimeblocks(expandedData) {
  expandedData.forEach((timeblock) => {
    const dayID = timeblock.startDateSimple;

    const timeblockHTML =
      `<div class="block" category="` +
      String(timeblock.category) +
      `" startPercentage="` +
      String(timeblock.startFraction) +
      `" endPercentage="` +
      String(timeblock.endFraction) +
      `" id="` +
      String(timeblock.id) +
      `"></div>`;

    document
      .getElementById(dayID)
      .querySelector(".inner-block-container").innerHTML += timeblockHTML;
  });
}

// Takes expanded data object and creates the columns in the interface
function createDayColumns(expandedData) {
  // Find earliest date
  const earliestDate = new Date(
    Math.min(...expandedData.map((timebar) => timebar.startTime))
  );

  // Construct array of dates
  const datesArray = getDaysArray(new Date(earliestDate), new Date());

  // For each of the dates in datesArray, create a column in the UI
  makeDayColumnsFromDatesList(datesArray);
}

// Takes an array of dates. Makes one empty column in the UI for each
function makeDayColumnsFromDatesList(datesArray) {
  // Currently in reverse order, need to reverse it
  const daysHTML = datesArray
    .reverse()
    .map((date) => {
      return buildDateColumnHTML(date);
    })
    .join("");

  // Insert into HTML
  const leftContainer = getElement(".left-container");
  leftContainer.innerHTML = daysHTML;
}

// Takes two dates and returns an array of date objects for all days between, inclusive
function getDaysArray(startDateObject, endDateObject) {
  var arr = [];
  startDateObject.setDate(startDateObject.getDate() - 1);
  for (
    var dt = startDateObject;
    dt < endDateObject;
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt));
  }

  // Need to fix it when I fix dates. Sometimes it doesn't register the most recent day, so I force it here
  if (arr[arr.length - 1].getDate() != endDateObject.getDate()) {
    arr.push(endDateObject);
  }
  return arr;
}

// Takes a Date object and returns the HTML for that date column
function buildDateColumnHTML(date) {
  // Make day ID
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const idString = String(year) + "-" + String(month + 1) + "-" + String(day);

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

export { showAndScaleTimeblocks, insertTimeblocks, illustrateTimeblocks };
