// TODO remove special characters
function makeTimerID(timerTitle) {
  return timerTitle.replace(/\s+/g, "-").toLowerCase();
}

export default makeTimerID;
