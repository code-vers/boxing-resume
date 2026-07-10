const axios = require('axios');
const instance = axios.create({
  baseURL: "https://boxing-data-api.p.rapidapi.com/v2",
  headers: {
    'x-rapidapi-host': "boxing-data-api.p.rapidapi.com",
    'x-rapidapi-key': "05241ebe2dmshe4b5cbe310c19ccp1503cfjsnfaab61a3cbdd",
  },
});

async function run() {
  const rankingsRes = await instance.get('/rankings');
  const rankings = rankingsRes.data.data || [];
  
  const championIds = new Set();
  rankings.forEach(r => {
    r.champions?.forEach(c => {
      if (c.fighter_id && !c.is_vacant) championIds.add(c.fighter_id);
    });
  });
  
  const topIds = Array.from(championIds).slice(0, 4);
  console.log("Fetching profiles for:", topIds);
  
  const promises = topIds.map(id => instance.get(`/fighters/${id}`));
  const responses = await Promise.all(promises);
  
  const featured = responses.map(r => r.data);
  featured.forEach(f => {
    console.log(f.name, f.stats);
  });
}
run();
