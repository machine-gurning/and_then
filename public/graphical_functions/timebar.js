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
