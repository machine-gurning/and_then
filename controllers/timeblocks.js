const Timeblock = require("../models/timeblock");
const bodyParser = require("body-parser");

const getAllTimeblocks = async (req, res) => {
  const allTimeblocks = await Timeblock.find({});
  res.status(201).json(allTimeblocks);
};

const createTimeBlock = async (req, res) => {
  const timeblock = await Timeblock.create(req.body);
  res.status(201).json({ timeblock });
};

module.exports = { getAllTimeblocks, createTimeBlock };
