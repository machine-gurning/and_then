import getElement from "../utilities/getElement.js";
import { showTimerSettingsEventListener } from "./settings.js";
import startStopEventListener from "./stopwatchController.js";

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

  console.log(timerContainer);

  // Done clicked -- add new timer
  timerCreateBtn.addEventListener("click", () => {
    // Extract timer name
    const timerName = getElement(".new-timer-name").value;
    const timerID = makeTimerID(timerName);

    // TODO ensure no identical class names -- reject if so

    // Remove timer creation box
    timerContainer.removeChild(timerContainer.lastElementChild);

    // Add new timer
    const newTimerHTML = `<div class="timer" id="${timerID}">
      <div class="timer-information">
        <div class="timer-title standard-settings-font-size-and-type">${timerName}</div>
        <div class="timer-time standard-settings-font-size-and-type">00:00:00</div>
      </div>
      <div class="timer-button-overlay">
        <button class="timer-start-stop-btn standard-btn standard-settings-font-size-and-type">start</button>
        <button class="timer-settings-btn standard-btn standard-settings-font-size-and-type">
          <i class="fas fa-cog"></i>
        </button>
      </div>
    </div>`;
    timerContainer.insertAdjacentHTML("beforeend", newTimerHTML);

    // Add event listeners
    const newTimer = timerContainer.lastElementChild;
    const newTimerButton = newTimer.querySelector(".timer-start-stop-btn");
    startStopEventListener(newTimerButton);
    showTimerSettingsEventListener(newTimer);
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
