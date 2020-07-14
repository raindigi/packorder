const csv = require('csvtojson');

async function csvParsing() {
  const jsonArray = await csv().fromFile('./test_data/Test task - Mongo - customers.csv');
  console.log(jsonArray);
}

csvParsing();
