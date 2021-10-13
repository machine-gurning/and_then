import getElement from "../utilities/getElement.js";
import { returnRandomColourNotUsed } from "../utilities/returnRandomColour.js";
import createElementWithClasses from "../utilities/createElementWithClasses.js";
import createNewTimerElementForSidebar from "./createNewTimerElementForSidebar.js";

const newTimerBtn = getElement(".new-timer-btn");
const timerContainer = getElement(".timers-sub-container");

const addNewTimer = function () {
  console.log("click!");
  // Create the new area with a box to enter the name
  const newTemporaryHTML = `
    
  <div class="temporary-timer-box">
  <input
    class="new-timer-name standard-settings-font-size-and-type"
    type="text"
    placeholder="Enter timer name"
  />
  <div class="new-timer-buttons-container">
    <button class="timer-create-btn standard-btn standard-settings-font-size-and-type">Done</button>
    <button class="timer-cancel-btn standard-btn standard-settings-font-size-and-type">Cancel</button>
  </div>
</div>
  `;
  timerContainer.insertAdjacentHTML("beforeend", newTemporaryHTML);

  // Await the "done" or "cancel" buttons
  const timerCreateBtn = getElement(".timer-create-btn");
  const timerCancelBtn = getElement(".timer-cancel-btn");

  // Done clicked -- add new timer
  timerCreateBtn.addEventListener("click", () => {
    // Extract timer name
    const timerName = getElement(".new-timer-name").value;
    const timerID = makeTimerID(timerName);

    // Create timer's colour
    const timerColour = returnRandomColourNotUsed();

    // TODO ensure no identical class names -- reject if so

    // Remove timer creation box
    timerContainer.removeChild(timerContainer.lastElementChild);

    // Add new timer

    const newTimer = createNewTimerElementForSidebar(
      timerID,
      timerName,
      timerColour
    );
    timerContainer.appendChild(newTimer);

    // Add event listeners
    // const newTimer = timerContainer.lastElementChild;
    // const newTimerButton = newTimer.querySelector(".timer-start-stop-btn");
    // startStopEventListener(newTimerButton);
    // showTimerSettingsEventListener(newTimer);

    // Colour the timer
    console.log(timerColour);
    console.log(newTimer.querySelector(".timer-information"));
    newTimer.style.backgroundColor = "#" + timerColour;
  });

  timerCancelBtn.addEventListener("click", () => {
    // "Cancel" clicked -- remove timer creation box
    timerContainer.removeChild(timerContainer.lastElementChild);
  });
};

function makeTimerID(timerTitle) {
  return timerTitle.replace(/\s+/g, "-").toLowerCase();
}

newTimerBtn.addEventListener("click", addNewTimer);

export { makeTimerID };
