const axios = require('axios');
const instance = axios.create({
  baseURL: "https://boxing-data-api.p.rapidapi.com/v2",
  headers: {
    'x-rapidapi-host': "boxing-data-api.p.rapidapi.com",
    'x-rapidapi-key': "05241ebe2dmshe4b5cbe310c19ccp1503cfjsnfaab61a3cbdd",
  },
});

instance.get('/fighters?page_size=5').then(res => {
  const data = res.data.data;
  data.forEach((f, i) => {
    console.log(`\nFighter ${i}:`);
    console.log("Name:", f.name);
    console.log("Stats:", f.stats);
  });
}).catch(err => console.error(err.message));
