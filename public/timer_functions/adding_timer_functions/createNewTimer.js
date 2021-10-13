import getElement from "../../utilities/getElement.js";

import { returnRandomColourNotUsed } from "../../utilities/returnRandomColour.js";

import cancelCreateNewTimer from "./cancelCreateNewTimer.js";
import createNewTimerElementForSidebar from "./createNewTimerElementForSidebar.js";
import makeTimerID from "./makeTimerId.js";

// Takes whatever is written in the new-timer-name input box, chooses a colour at random (which is not yet in use), and creates the timer. Then hides the creation buttons and input box
function createNewTimer() {
  // Extract timer name
  const timerName = getElement(".new-timer-name").value;
  const timerID = makeTimerID(timerName);
  const timerColour = returnRandomColourNotUsed();

  // TODO ensure no identical class names -- reject if so

  // Add new timer
  const newTimer = createNewTimerElementForSidebar(
    timerID,
    timerName,
    timerColour
  );
  // Colour the timer
  newTimer.style.backgroundColor = "#" + timerColour;

  // Append the timer
  const timerContainer = getElement(".timers-sub-container");
  timerContainer.appendChild(newTimer);

  // Erase contents of whatever is in the timer input box
  getElement(".new-timer-name").value = "";

  // Unhide "create new timer" button
  cancelCreateNewTimer();
}

export default createNewTimer;
