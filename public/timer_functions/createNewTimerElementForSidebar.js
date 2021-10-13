import createElementWithClasses from "../utilities/createElementWithClasses.js";

function createNewTimerElementForSidebar(id, name, colour) {
  // Create timer information component
  let timerTitle = createElementWithClasses(
    "div",
    "timer-title standard-settings-font-size-and-type"
  );
  let timerTitleText = document.createTextNode(`${name}`);
  timerTitle.appendChild(timerTitleText);

  let timerTime = createElementWithClasses(
    "div",
    "timer-time standard-settings-font-size-and-type"
  );
  let timerTimeText = document.createTextNode(`00:00:00`);
  timerTime.appendChild(timerTimeText);

  let timerInformationElement = createElementWithClasses(
    "div",
    "timer-information"
  );
  timerInformationElement.appendChild(timerTitle);
  timerInformationElement.appendChild(timerTime);

  // Create settings component
  let buttonCog = createElementWithClasses(
    "i",
    "fas fa-cog do-not-register-click-events"
  );
  let settingsButton = createElementWithClasses(
    "button",
    "timer-settings-btn standard-btn standard-settings-font-size-and-type"
  );

  settingsButton.appendChild(buttonCog);

  let startButton = createElementWithClasses(
    "button",
    "timer-start-stop-btn standard-btn standard-settings-font-size-and-type"
  );

  let startButtonInitialText = document.createTextNode("Start");
  startButton.appendChild(startButtonInitialText);

  let timerOverlayElement = createElementWithClasses(
    "div",
    "timer-button-overlay"
  );

  timerOverlayElement.appendChild(startButton);
  timerOverlayElement.appendChild(settingsButton);

  // Join the two sections
  let timerContainer = createElementWithClasses("div", "timer");
  timerContainer.setAttribute("id", `${id}`);
  timerContainer.setAttribute("colour", `${colour}`);

  timerContainer.appendChild(timerInformationElement);
  timerContainer.appendChild(timerOverlayElement);

  return timerContainer;
}

export default createNewTimerElementForSidebar;
