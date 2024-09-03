const express = require("express");
const cors = require("cors");
const connection = require("./database");
const getPeriodData = require("./getPeriodData");
const getRegionData = require("./getRegionData");
const getWeekDayData = require("./getWeekDayData");
const getArrivedData = require("./getArrivedData");
const getReasonData = require("./getReasonData");

const PORT = process.env.PORT || 4003;
const app = express();
app.use(cors());
app.use(express.json());
app.listen(PORT, () => console.log("server started"));

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

function validateDateFormat(req, res, next) {
  const { startDate, endDate } = req.body;

  const isStartDateValid = !startDate || dateRegex.test(startDate);
  const isEndDateValid = !endDate || dateRegex.test(endDate);

  if (!isStartDateValid || !isEndDateValid) {
    return res
      .status(400)
      .json({ error: "Invalid date format. Please use YYYY-MM-DD." });
  }

  next();
}

app.post("/case102/api/regionData", validateDateFormat, (req, res) => {
  getRegionData(req, res);
});

app.post("/case102/api/periodData", validateDateFormat, (req, res) => {
  getPeriodData(req, res);
});

app.post("/case102/api/weekdayData", validateDateFormat, (req, res) => {
  getWeekDayData(req, res);
});

app.post("/case102/api/arrivedData", validateDateFormat, (req, res) => {
  getArrivedData(req, res);
});

app.post("/case102/api/reasonData", validateDateFormat, (req, res) => {
  getReasonData(req, res);
});
