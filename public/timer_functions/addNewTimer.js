import getElement from "../utilities/getElement.js";
import startStopEventListener from "./stopwatchController.js";

const newTimerBtn = getElement(".new-timer-btn");
const timerContainer = getElement(".timers-sub-container");

const addNewTimer = function () {
  console.log("click!");
  // Create the new area with a box to enter the name
  const newTemporaryHTML = `
    
  <div class="temporary-timer-box">
  <input
    class="new-timer-name"
    type="text"
    placeholder="Enter timer name"
  />
  <div class="new-timer-buttons-container">
    <button class="timer-create-btn">Done</button>
    <button class="timer-cancel-btn">Cancel</button>
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
    const timerID = timerName.replace(/\s+/g, "-").toLowerCase();

    // TODO ensure no identical class names -- reject if so

    // Remove timer creation box
    timerContainer.removeChild(timerContainer.lastElementChild);

    // Add new timer
    const newTimerHTML = `<div class="timer" id="${timerID}">
      <div class="timer-information">
        <div class="timer-title">${timerName}</div>
        <div class="timer-time">00:00:00</div>
      </div>
      <div class="timer-button-overlay">
        <button class="timer-start-stop-btn">start</button>
        <button class="timer-settings-btn">
          <i class="fas fa-cog"></i>
        </button>
      </div>
    </div>`;
    timerContainer.insertAdjacentHTML("beforeend", newTimerHTML);

    // Add event listener
    const newTimer = timerContainer.lastElementChild;
    const newTimerButton = newTimer.querySelector(".timer-start-stop-btn");
    startStopEventListener(newTimerButton);
  });

  timerCancelBtn.addEventListener("click", () => {
    // "Cancel" clicked -- remove timer creation box
    timerContainer.removeChild(timerContainer.lastElementChild);
  });
};

newTimerBtn.addEventListener("click", addNewTimer);
