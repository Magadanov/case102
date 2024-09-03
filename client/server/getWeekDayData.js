const connection = require("./database");
const getConditionString = require("./getConditionString");

const weekdaysName = {
  1: "Понедельник",
  2: "Вторник",
  3: "Среда",
  4: "Четверг",
  5: "Пятница",
  6: "Суббота",
  7: "Воскресенье",
};

async function getWeekDayData(req, res) {
  const { startDate, endDate } = req.body;

  const conditionString = getConditionString(startDate, endDate);

  connection.query(
    `SELECT 
        weekName AS weekday,
        COUNT(*) AS count
    FROM case102
    ${conditionString}
    GROUP BY weekday;
`,
    (error, results, fields) => {
      if (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Server Error");
      }
      const sortedRows = results.sort((a, b) => a.weekday - b.weekday);
      const result = sortedRows.map((item) => {
        const weekday = weekdaysName[item.weekday];
        const numberOfCalls = Number(item.count);
        return { weekday, numberOfCalls };
      });
      res.send(result);
    }
  );
}

module.exports = getWeekDayData;
