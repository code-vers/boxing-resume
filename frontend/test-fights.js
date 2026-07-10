const axios = require('axios');
const instance = axios.create({
  baseURL: "https://boxing-data-api.p.rapidapi.com/v2",
  headers: {
    'x-rapidapi-host': "boxing-data-api.p.rapidapi.com",
    'x-rapidapi-key': "05241ebe2dmshe4b5cbe310c19ccp1503cfjsnfaab61a3cbdd",
  },
});

instance.get('/fights?date_sort=DESC&page_size=5').then(res => {
  const data = res.data.data;
  data.forEach((fight, i) => {
    console.log(`\nFight ${i}:`);
    console.log("Date:", fight.date);
    console.log("Status:", fight.status);
    console.log("Results:", fight.results);
    const f1 = fight.fighters?.fighter_1;
    const f2 = fight.fighters?.fighter_2;
    console.log(`Fighter 1: ${f1?.fighter_name} (winner: ${f1?.winner})`);
    console.log(`Fighter 2: ${f2?.fighter_name} (winner: ${f2?.winner})`);
  });
}).catch(err => console.error(err.message));
