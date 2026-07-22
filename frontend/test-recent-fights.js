const axios = require('axios');
const instance = axios.create({
  baseURL: "https://boxing-data-api.p.rapidapi.com/v2",
  headers: {
    'x-rapidapi-host': "boxing-data-api.p.rapidapi.com",
    'x-rapidapi-key': "05241ebe2dmshe4b5cbe310c19ccp1503cfjsnfaab61a3cbdd",
  },
});

async function getRecentResults() {
  const rankingsRes = await instance.get('/rankings');
  const rankings = rankingsRes.data.data;
  
  const championIds = new Set();
  rankings.forEach(r => {
    r.champions?.forEach(c => {
      if (c.fighter_id) championIds.add(c.fighter_id);
    });
  });
  
  const topIds = Array.from(championIds).slice(0, 5); // take 5 champions
  console.log("Fetching fights for champions:", topIds);
  
  let allFights = [];
  for (const id of topIds) {
    const fightsRes = await instance.get(`/fights?fighter_id=${id}&date_sort=DESC&page_size=5`);
    const fights = fightsRes.data.data || [];
    const finished = fights.filter(f => f.status === 'FINISHED' && f.results);
    if (finished.length > 0) {
      allFights.push(finished[0]); // get their most recent fight
    }
  }
  
  allFights.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  allFights.forEach((f, i) => {
    console.log(`\nResult ${i}:`);
    console.log("Date:", f.date);
    console.log("Fighter 1:", f.fighters?.fighter_1?.fighter_name);
    console.log("Fighter 2:", f.fighters?.fighter_2?.fighter_name);
    console.log("Outcome:", f.results?.outcome);
  });
}
getRecentResults();
