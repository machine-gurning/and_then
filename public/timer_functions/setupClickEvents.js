import addNewTimerInterface from "./adding_timer_functions/addNewTimerInterface.js";
import cancelCreateNewTimer from "./adding_timer_functions/cancelCreateNewTimer.js";
import createNewTimer from "./adding_timer_functions/createNewTimer.js";
import { showTimerSettings } from "./settings.js";
import startStopEventListener from "./stopwatchController.js";

document.addEventListener("click", function (e) {
  // Start or stop timer
  if (e.target.classList.contains("timer-start-stop-btn")) {
    // Start or stop the timers
    startStopEventListener(e.target);
  }
  // Open settings
  if (e.target.classList.contains("timer-settings-btn")) {
    // Open the settings
    showTimerSettings(e.target.parentElement.parentElement.id);
  }

  // Add new timer button
  if (e.target.classList.contains("new-timer-btn")) {
    addNewTimerInterface();
  }

  // Create new timer button
  if (e.target.classList.contains("timer-create-btn")) {
    createNewTimer();
  }

  // Cancel create new timer button
  if (e.target.classList.contains("timer-cancel-btn")) {
    cancelCreateNewTimer();
  }
});
