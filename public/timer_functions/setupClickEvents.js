import getElement from "../utilities/getElement.js";
import { showTimerSettings } from "./settings.js";
import startStopEventListener from "./stopwatchController.js";

const timersSubContainer = getElement(".timers-sub-container");
timersSubContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("timer-start-stop-btn")) {
    // Start or stop the timers
    startStopEventListener(e.target);
  }
  if (e.target.classList.contains("timer-settings-btn")) {
    // Open the settings
    showTimerSettings(e.target.parentElement.parentElement.id);
  }
});
