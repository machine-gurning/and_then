import getElement from "../utilities/getElement.js";
import startStopEventListener from "./stopwatchController.js";
import { showTimerSettingsEventListener } from "./settings.js";

// Takes the database, finds unique categories, puts them in the sidebar
function setUpSidebar(expandedData) {
  // Extract category ID, presentable name, colour
  const timerCategories = findUniqueTimerCategories(expandedData);

  // Insert them into the sidebar
  const timerCategoriesHTML = timerCategories
    .map((category) => buildTimerCategoryHTML(category))
    .join("");

  // Inset HTML into the sidebar
  const timersSubContainer = getElement(".timers-sub-container");
  timersSubContainer.innerHTML = timerCategoriesHTML;

  // Add event listeners
  let newTimerButtons = document.querySelectorAll(".timer-start-stop-btn");

  newTimerButtons = [...newTimerButtons];
  newTimerButtons.forEach((button) => {
    startStopEventListener(button);
  });

  let newTimerCards = document.querySelectorAll(".timer");
  newTimerCards = [...newTimerCards];

  newTimerCards.forEach((card) => {
    showTimerSettingsEventListener(card);
  });
}

// Takes the expanded database, finds total time per timer, returns it in an object
function findTimerTotals() {}

// Take category ID, category presentable title, and colour object, and return the HTML for that timer's little sidebar card
function buildTimerCategoryHTML(category) {
  return `<div class="timer" id="${category.category}" colour="${category.colour}">
<div class="timer-information" >
  <div class="timer-title standard-settings-font-size-and-type">${category.categoryPresentable}</div>
  <div class="timer-time standard-settings-font-size-and-type">00:00:00</div>
</div>
<div class="timer-button-overlay">
  <button class="timer-start-stop-btn standard-btn standard-settings-font-size-and-type">start</button>
  <button class="timer-settings-btn standard-btn standard-settings-font-size-and-type">
    <i class="fas fa-cog"></i>
  </button>
</div>
</div>`;
}

// Take all the expanded data, return an object with category ID and category presentable name for each
function findUniqueTimerCategories(expandedData) {
  let categories = expandedData.map((timeblock) => {
    return {
      category: timeblock.category,
      categoryPresentable: timeblock.categoryPresentable,
      colour: timeblock.colour,
    };
  });

  const uniqueCategories = removeDuplicates(categories, "category");
  return uniqueCategories;
}

function removeDuplicates(myArr, prop) {
  return myArr.filter((obj, pos, arr) => {
    return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
}
export default setUpSidebar;
