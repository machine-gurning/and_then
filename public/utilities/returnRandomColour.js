// Function that returns a random colour, given a list of colours
function returnRandomColour(colourList) {
  const randomIndex = Math.floor(Math.random() * colourList.length);

  return colourList[randomIndex];
}

// Returns a list of colours not yet used
function returnListOfColoursNotUsed() {
  // Extract all colours in use
  let allCards = [...document.querySelectorAll(".timer")];
  console.log(allCards);

  let activeColours = [];

  allCards.forEach((card) => {
    const colour = card.getAttribute("colour");

    activeColours.push(colour);
    console.log(colour);
  });
  console.log(allCards);
  console.log(activeColours);

  // Remove them from list of colours
  let colourList = [
    "FFADAD",
    "FFD65A",
    "FDFFB6",
    "CAFFBF",
    "9BF6FF",
    "A0C4FF",
    "BDB2FF",
    "FFC6FF",
    "C9DED7",
    "CCD5AE",
    "E9DC9",
    "FAEDCD",
    "D4A373",
    "BDEOFE",
  ];

  colourList = colourList.filter((colour) => !activeColours.includes(colour));

  // Select random colour
  return colourList;
}

// Function that returns a random colour, given a list of colours, all of which aren't used
function returnRandomColourNotUsed() {
  const colourList = returnListOfColoursNotUsed();

  return returnRandomColour(colourList);
}

export { returnRandomColourNotUsed };
