import getElement from "./utilities/getElement.js";
import "./timer_functions/addNewTimer.js";
import "./timer_functions/clock.js";
import "./timer_functions/stopwatchController.js";
import getTimeBlocks from "./data_functions/getData.js";
import interpretTimeblocks from "./data_functions/interpretTimeblocks.js";
import {
  showAndScaleTimeblocks,
  illustrateTimeblocks,
} from "./graphical_functions/visualiseTimeblocks.js";

import setUpSidebar from "./timer_functions/setUpSidebar.js";

async function init() {
  // Get data from server
  const allData = await getTimeBlocks();
  const expandedData = interpretTimeblocks(allData);

  // Illustrate blocks
  showAndScaleTimeblocks(expandedData);

  // Populate timers bar with all the timers
  setUpSidebar(expandedData);

  // Resize blocks when window resizes
  window.addEventListener("resize", () => {
    let globalResizeTimer = null;
    // scale everything upon page resize but don't spam it
    if (globalResizeTimer != null) window.clearTimeout(globalResizeTimer);
    globalResizeTimer = window.setTimeout(illustrateTimeblocks, 200);
  });
}

init();
