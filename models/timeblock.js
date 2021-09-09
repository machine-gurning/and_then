const mongoose = require("mongoose");

const TimeblockSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    requred: true,
  },
  elapsedTime: {
    type: Date,
    requred: true,
  },
});

module.exports = mongoose.model("Timeblock", TimeblockSchema);
