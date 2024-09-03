function getConditionString(startDate, endDate) {
  let conditionString = "";
  if (startDate.length) {
    conditionString = `WHERE date_incident >= '${startDate}'`;
  }

  if (endDate.length) {
    conditionString = `WHERE date_incident <= '${endDate}'`;
  }

  if (startDate.length && endDate.length) {
    conditionString = `WHERE date_incident BETWEEN '${startDate}' AND '${endDate}'`;
  }

  return conditionString;
}

module.exports = getConditionString;
