const axios = require('axios');
const instance = axios.create({
  baseURL: "https://boxing-data-api.p.rapidapi.com/v2",
  headers: {
    'x-rapidapi-host': "boxing-data-api.p.rapidapi.com",
    'x-rapidapi-key': "05241ebe2dmshe4b5cbe310c19ccp1503cfjsnfaab61a3cbdd",
  },
});

instance.get('/rankings').then(res => {
  console.log("Total items:", res.data.data.length);
  res.data.data.slice(0, 4).forEach((r, i) => {
    console.log(`\nRanking Item ${i}:`);
    console.log("Org:", r.organization.name);
    console.log("Div:", r.division.name);
    console.log("Champions:", r.champions);
  });
}).catch(err => console.error(err.message));
