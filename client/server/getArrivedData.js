const connection = require("./database");
const getConditionString = require("./getConditionString");

async function getArrivedData(req, res) {
  const { startDate, endDate } = req.body;

  const conditionString = getConditionString(startDate, endDate);
  connection.query(
    `SELECT arrived_time, region, COUNT(region) AS count FROM case102 
     ${
       conditionString ? conditionString + " AND" : "WHERE"
     } arrived_time is not null GROUP BY arrived_time, region;`,
    (error, results, fields) => {
      if (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Server Error");
      }
      const result = results.map((item) => {
        const arrived_time = item.arrived_time;
        const region = item.region;
        const numberOfCalls = Number(item.count);
        return { region, arrived_time, numberOfCalls };
      });
      res.send(result);
    }
  );
}

module.exports = getArrivedData;
