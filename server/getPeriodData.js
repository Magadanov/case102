const connection = require("./database");
const getConditionString = require("./getConditionString");

const connectionPool = connection.promise();

async function getPeriodData(req, res) {
  try {
    const { startDate, endDate } = req.body;

    const conditionString = getConditionString(startDate, endDate);

    // Combine all queries into a single query to reduce the number of database round-trips
    const combinedQuery = `
      SELECT 
        COUNT(*) AS total,
        SUM(CASE WHEN isNight = 0 THEN 1 ELSE 0 END) AS totalDays,
        SUM(CASE WHEN isHoliday = 1 THEN 1 ELSE 0 END) AS totalHolidays
      FROM case102
      ${conditionString}
    `;

    const [results] = await connectionPool.query(combinedQuery);

    const totalItems = results[0].total;
    const totalDays = results[0].totalDays;
    const totalHolidays = results[0].totalHolidays;

    res.json({
      day_percentage:
        totalItems > 0
          ? Number(((totalDays / totalItems) * 100).toFixed(2))
          : 0,
      holidays_percentage:
        totalItems > 0
          ? Number(((totalHolidays / totalItems) * 100).toFixed(2))
          : 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
}

module.exports = getPeriodData;
