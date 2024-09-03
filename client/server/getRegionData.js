const connection = require("./database");
const getConditionString = require("./getConditionString");

let cache = [];
let lastFetchTime = 0;

async function fetchRegionData() {
  try {
    const connectionPool = connection.promise();

    const [katoData] = await connectionPool.query("SELECT * FROM kato;");

    cache = katoData;
    lastFetchTime = Date.now();
  } catch (error) {
    console.error("Error fetching kato data for cache:", error);
  }
}

fetchRegionData();

setInterval(fetchRegionData, 4 * 60 * 60 * 1000);

async function getRegionData(req, res) {
  try {
    const { startDate, endDate } = req.body;
    const conditionString = getConditionString(startDate, endDate);
    const connectionPool = connection.promise();

    const query = `
      SELECT kato, COUNT(*) AS numberOfCalls 
      FROM case102 
      ${conditionString} 
      GROUP BY kato;
    `;
    const [results] = await connectionPool.query(query);

    const data = results.map((item) => {
      const regionInfo = cache.find((kt) => kt.kato === String(item.kato));
      return {
        kato: item.kato,
        numberOfCalls: item.numberOfCalls,
        region: regionInfo ? regionInfo.region_name : "Unknown",
      };
    });

    res.send(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Server Error");
  }
}

module.exports = getRegionData;
