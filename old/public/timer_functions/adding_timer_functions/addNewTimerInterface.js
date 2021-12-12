import getElement from "../../utilities/getElement.js";

function addNewTimerInterface() {
  // Hide "add new timer" botton
  const addNewTimerButton = getElement(".new-timer-btn");
  addNewTimerButton.classList.add("new-timer-buttons-hidden");

  // Unhide new timer fields
  const newTimerControlsContainer = getElement(".new-timer-controls-container");
  let newTimerControlsList = [
    ...newTimerControlsContainer.getElementsByTagName("*"),
  ];

  newTimerControlsList.push(newTimerControlsContainer);

  newTimerControlsList.forEach((element) => {
    element.classList.remove("new-timer-buttons-hidden");
  });
}

export default addNewTimerInterface;
