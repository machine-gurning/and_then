// Function that takes an element type and a string or array of strings, and returns the element with its classes imbued
function createElementWithClasses(elementType, classOrClassList) {
  // If it is a string with space characters, turn into an array
  let classes = classOrClassList;
  if (!Array.isArray(classes)) {
    classes = classes.split(" ");
  }

  // Create the elekent, add the classes
  let newElement = document.createElement(elementType);
  newElement.classList.add(...classes);

  // Return the element
  return newElement;
}

export default createElementWithClasses;
