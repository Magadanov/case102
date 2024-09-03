const connection = require("./database");
const getConditionString = require("./getConditionString");

async function getReasonData(req, res) {
  const { startDate, endDate } = req.body;

  const conditionString = getConditionString(startDate, endDate);
  connection.query(
    `select reason, count(*) as count from case102 ${conditionString} group by 1 order by count desc limit 10;`,
    (error, results, fields) => {
      if (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Server Error");
      }
      const result = results.map((item) => {
        const reason = item.reason;
        const numberOfCalls = Number.parseInt(item.count);
        return { reason, numberOfCalls };
      });
      res.send(result);
    }
  );
}

module.exports = getReasonData;
