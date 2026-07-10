const axios = require('axios');
const instance = axios.create({
  baseURL: "https://boxing-data-api.p.rapidapi.com/v2",
  headers: {
    'x-rapidapi-host': "boxing-data-api.p.rapidapi.com",
    'x-rapidapi-key': "05241ebe2dmshe4b5cbe310c19ccp1503cfjsnfaab61a3cbdd",
  },
});

instance.get('/titles').then(res => {
  console.log("Total items:", res.data.pagination?.total_items);
  console.log("Titles:", res.data.data.slice(0, 10).map(t => ({
    id: t.id,
    name: t.name,
    fighter_id: t.fighter_id,
    champion_id: t.champion_id,
    fighter: t.fighter
  })));
}).catch(err => console.error(err.message));
