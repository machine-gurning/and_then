const express = require("express");
const router = express.Router();

const {
  getAllTimeblocks,
  createTimeBlock,
} = require("../controllers/timeblocks");

router.route("/timeblocks").get(getAllTimeblocks).post(createTimeBlock);

module.exports = router;
