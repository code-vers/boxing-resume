const axios = require('axios');
const instance = axios.create({
  baseURL: "https://boxing-data-api.p.rapidapi.com/v2",
  headers: {
    'x-rapidapi-host': "boxing-data-api.p.rapidapi.com",
    'x-rapidapi-key': "05241ebe2dmshe4b5cbe310c19ccp1503cfjsnfaab61a3cbdd",
  },
});

async function run() {
  const fightsRes = await instance.get(`/fights?fighter_id=6715fc1faf69bb50508b7c12&date_sort=DESC&page_size=5`);
  const fights = fightsRes.data.data || [];
  const finished = fights.filter(f => f.status === 'FINISHED' && f.results);
  console.log(JSON.stringify(finished[0].fighters, null, 2));
}
run();
