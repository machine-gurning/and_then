import getElement from "../utilities/getElement.js";
import createNewTimerElementForSidebar from "./adding_timer_functions/createNewTimerElementForSidebar.js";

// Takes the database, finds unique categories, puts them in the sidebar
function setUpSidebar(expandedData) {
  // Extract category ID, presentable name, colour
  const timerCategories = findUniqueTimerCategories(expandedData);
  const timersSubContainer = getElement(".timers-sub-container");

  // Insert them into the sidebar
  timerCategories.forEach((category) => {
    const newCard = createNewTimerElementForSidebar(
      category.category,
      category.categoryPresentable,
      category.colour
    );
    newCard.style.backgroundColor = "#" + category.colour;
    timersSubContainer.appendChild(newCard);
  });
}

// Takes the expanded database, finds total time per timer, returns it in an object
function findTimerTotals() {}

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
