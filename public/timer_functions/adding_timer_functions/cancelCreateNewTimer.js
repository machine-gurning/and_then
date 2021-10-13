import getElement from "../../utilities/getElement.js";

function cancelCreateNewTimer() {
  // Remove hidden on "add new timer" button
  const addNewTimerButton = getElement(".new-timer-btn");

  addNewTimerButton.classList.remove("new-timer-buttons-hidden");
  // Hide the new timer controller container

  const newTimerControlsContainer = getElement(".new-timer-controls-container");
  let newTimerControlsList = [
    ...newTimerControlsContainer.getElementsByTagName("*"),
  ];

  newTimerControlsList.push(newTimerControlsContainer);

  newTimerControlsList.forEach((element) => {
    element.classList.add("new-timer-buttons-hidden");
  });
}

export default cancelCreateNewTimer;
