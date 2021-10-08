import getElement from "../utilities/getElement.js";

// Takes the database, finds unique categories, puts them in the sidebar
function setUpSidebar(expandedData) {
  console.log(expandedData);

  // Extract category ID, presentable name, colour
  const timerCategories = findUniqueTimerCategories(expandedData);

  // Insert them into the sidebar
  const timerCategoriesHTML = timerCategories
    .map((category) => buildTimerCategoryHTML(category))
    .join("");

  // Inset HTML into the sidebar
  const timersSubContainer = getElement(".timers-sub-container");

  timersSubContainer.innerHTML = timerCategoriesHTML;
}

// Takes the expanded database, finds total time per timer, returns it in an object
function findTimerTotals() {}

// Take category ID, category presentable title, and colour object, and return the HTML for that timer's little sidebar card
function buildTimerCategoryHTML(category) {
  return `<div class="timer" id="${category.category}" colour="${category.colour}">
<div class="timer-information" >
  <div class="timer-title">${category.categoryPresentable}</div>
  <div class="timer-time">00:00:00</div>
</div>
<div class="timer-button-overlay">
  <button class="timer-start-stop-btn">start</button>
  <button class="timer-settings-btn">
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
  console.log(uniqueCategories);
  return uniqueCategories;
}

function removeDuplicates(myArr, prop) {
  return myArr.filter((obj, pos, arr) => {
    return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
}
export default setUpSidebar;
