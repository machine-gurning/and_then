const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  } else {
    return new Error("no such element");
  }
};

export default getElement;
