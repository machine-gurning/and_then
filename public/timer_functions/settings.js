// For all settings-container related function

import getElement from "../utilities/getElement.js";
import { makeTimerID } from "./addNewTimer.js";

function showTimerSettingsEventListener(timerCard) {
  const timerSettingsButton = timerCard.querySelector(".timer-settings-btn");
  const id = timerCard.id;
  timerSettingsButton.addEventListener("click", () => {
    showTimerSettings(id);
  });
}

// Function that is executed when the user clicks the cog on one of the timers
function showTimerSettings(categoryID) {
  // Find the category information by searching within the cards
  let timerCard = getElement("#" + categoryID);
  const allTimerSettingsElements = [
    ...document.querySelectorAll(".timer-settings"),
  ];
  const settingsContainerElements = [
    ...document.querySelectorAll(".general-settings-element"),
  ];
  const allSettingsElements = [...document.querySelectorAll(".settings")];
  const timerCategory = timerCard.querySelector(".timer-title").innerText;
  const timerColour = timerCard.getAttribute("colour");
  const timerSettingsTitle = document
    .querySelector(".timer-setting-title")
    .querySelector(".setting-value");
  const timerSettingsColour = document
    .querySelector(".timer-setting-colour")
    .querySelector(".setting-value");

  console.log(timerSettingsTitle);

  // Insert the information into the appropriate locations
  timerSettingsTitle.placeholder = timerCategory;
  timerSettingsColour.placeholder = timerColour;

  // Ensure no other settings are currently being shown
  allSettingsElements.forEach((setting) => {
    setting.classList.add("settings-hidden");
  });
  // Add onclick consequences
  // - Change name

  timerSettingsTitle.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      console.log(
        `new timer name is ${timerSettingsTitle.value} -- NOT YET FULLY IMPLEMENTED`
      );
      updateCategoryTitleUIAndData(categoryID, timerSettingsTitle.value);
    }
  });
  // - Change colour
  timerSettingsColour.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      console.log(
        `new timer colour is ${timerSettingsColour.value} -- NOT YET FULLY IMPLEMENTED`
      );
      updateCategoryColourUIAndData(categoryID, timerSettingsColour.value);
    }
  });

  // - Delete category
  // TODO

  // Show the elements by removing the hidden class
  allTimerSettingsElements.forEach((setting) => {
    setting.classList.remove("settings-hidden");
  });
  settingsContainerElements.forEach((setting) => {
    setting.classList.remove("settings-hidden");
  });

  getElement(".settings-container-close-button").addEventListener(
    "click",
    () => {
      hideSettings();
    }
  );
}

// Function to close whichever settings are currently open
function hideSettings() {
  const allSettingsElements = [...document.querySelectorAll(".settings")];

  allSettingsElements.forEach((setting) => {
    setting.classList.add("settings-hidden");
  });
}

function updateCategoryTitleUIAndData(categoryID, newTitle) {
  // Update server
  // Update UI
  const categoryCard = document.querySelector("#" + categoryID);
  categoryCard.querySelector(".timer-title").innerText = newTitle;
  categoryCard.id = makeTimerID(newTitle);
}

function updateCategoryColourUIAndData(categoryID, newColour) {
  // Update server
  // Update UI
  const categoryCard = document.querySelector("#" + categoryID);
  categoryCard.setAttribute("colour", newColour);
}

function showTimeblockSettings() {}

export { showTimerSettingsEventListener };
