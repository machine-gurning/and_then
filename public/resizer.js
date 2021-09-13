// // Timer to avoid too many calls
// var globalResizeTimer = null;

// // Function to scale time-bar and blocks
// function scaleEverything() {
//   placeTimeBar();
//   // redrawBlocks();
// }

// // scale everything upon page resize but don't spam it
// window.addEventListener("resize", () => {
//   if (globalResizeTimer != null) window.clearTimeout(globalResizeTimer);
//   globalResizeTimer = window.setTimeout(scaleEverything, 200);
// });

// // Function to refresh time-bar location every 20 seconds
// function refreshTimeBar() {
//   var refresh = 20000;
//   myTime = setTimeout("placeTimeBar()", refresh);
// }

// function placeTimeBar() {
//   // TODO allow sub-section of day to be displayed, with start and end times

//   // 1. Find current portion of day
//   var date = new Date();
//   var currentTimeFraction =
//     date.getHours() / 24 +
//     date.getMinutes() / 60 / 24 +
//     date.getSeconds() / 60 / 60 / 24;

//   // 2. Convert into portion of page size
//   var timelineHeight = document.querySelector(
//     ".outer-block-container"
//   ).clientHeight;

//   var offsetFromTop = Math.round(timelineHeight * currentTimeFraction);

//   // 3. Change "Top" CSS attribute
//   //console.log(offsetFromTop);

//   document.querySelector(".time-bar").style.top = offsetFromTop + "px";

//   refreshTimeBar();
// }

// // Function to scale all blocks

// // function redrawBlocks() {
// //   // TODO allow timeline to be a fraction of the day here

// //   // Find total timeline height
// //   var timelineHeight = document.querySelector(
// //     ".inner-block-container"
// //   ).clientHeight;

// //   // Find all blocks and spacers in the document
// //   var allBlocks = document.querySelectorAll(".block");
// //   var allSpacers = document.querySelectorAll(".spacer");
// // }
