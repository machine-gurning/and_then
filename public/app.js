import getElement from "./utilities/getElement.js";
import "./timer_functions/addNewTimer.js";
import "./timer_functions/clock.js";
import "./timer_functions/stopwatchController.js";
import getTimeBlocks from "./data_functions/getData.js";
import interpretTimeblocks from "./data_functions/interpretTimeblocks.js";
import {
  showAndScaleTimeblocks,
  insertTimeblocks,
  illustrateTimeblocks,
} from "./graphical_functions/visualiseTimeblocks.js";

async function init() {
  const allData = await getTimeBlocks();
  const expandedData = interpretTimeblocks(allData);
  showAndScaleTimeblocks(expandedData);

  window.addEventListener("resize", () => {
    let globalResizeTimer = null;
    // scale everything upon page resize but don't spam it
    if (globalResizeTimer != null) window.clearTimeout(globalResizeTimer);
    globalResizeTimer = window.setTimeout(illustrateTimeblocks, 200);
  });
}

init();
