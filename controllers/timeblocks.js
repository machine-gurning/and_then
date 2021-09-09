const Timeblock = require("../models/timeblock");
const Task = require("../models/timeblock");
const bodyParser = require("body-parser");

function getAllTimeblocks(req, res) {
  res.send("aallll yesss annywayy");
}

const createTimeBlock = async (req, res) => {
  const timeblock = await Timeblock.create(req.body);
  res.status(201).json({ timeblock });
};

module.exports = { getAllTimeblocks, createTimeBlock };
