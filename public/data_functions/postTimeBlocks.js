const URL = "api/v1/timeblocks";
// POST NEW BLOCK TO SERVER
function postNewTimeblockToServer(
  category,
  categoryPresentable,
  colour,
  startTime,
  endTime,
  elapsedTime
) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", URL);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      category: category,
      categoryPresentable: categoryPresentable,
      colour: colour,
      startTime: startTime,
      endTime: endTime,
      elapsedTime: elapsedTime,
    })
  );
}

export { postNewTimeblockToServer };
