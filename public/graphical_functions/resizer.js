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

function placeTimeBar() {
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

// Function to refresh time-bar location every 20 seconds
function refreshTimeBar() {
  var refresh = 20000;
  let myTime = setTimeout(placeTimeBar(), refresh);
}

// Function to scale all blocks
function resizeTimeblocks() {
  // Find total timeline height
  var timelineHeight = document.querySelector(
    ".inner-block-container"
  ).clientHeight;

  // Find all timeblocks
  let timeblocks = document.querySelectorAll(".block");
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

export { scaleEverything, placeTimeBar, resizeTimeblocks };
