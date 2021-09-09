const mongoose = require("mongoose");

const conenctDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log("connectted d too ddbbbb"))
    .catch((err) => console.log(err));
};

module.exports = conenctDB;
