const axios = require('axios');
const instance = axios.create({
  baseURL: "https://boxing-data-api.p.rapidapi.com/v2",
  headers: {
    'x-rapidapi-host': "boxing-data-api.p.rapidapi.com",
    'x-rapidapi-key': "05241ebe2dmshe4b5cbe310c19ccp1503cfjsnfaab61a3cbdd",
  },
});

async function run() {
  const res = await instance.get('/fights?page_size=50');
  const data = res.data.data;
  console.log(`Total fights in page 1: ${data.length}`);
  const finished = data.filter(f => f.status === 'FINISHED' && f.results);
  console.log(`Finished fights: ${finished.length}`);
  finished.slice(0, 3).forEach((f, i) => {
    console.log(`\nFight ${i}:`);
    console.log(f.date, f.fighters?.fighter_1?.fighter_name, "vs", f.fighters?.fighter_2?.fighter_name);
    console.log("Outcome:", f.results.outcome);
  });
}
run();
