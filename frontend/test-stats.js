const axios = require('axios');
const instance = axios.create({
  baseURL: "https://boxing-data-api.p.rapidapi.com/v2",
  headers: {
    'x-rapidapi-host': "boxing-data-api.p.rapidapi.com",
    'x-rapidapi-key': "05241ebe2dmshe4b5cbe310c19ccp1503cfjsnfaab61a3cbdd",
  },
});

async function run() {
  try {
    const fRes = await instance.get('/fighters?page_size=1');
    console.log("Fighters total_items:", fRes.data.pagination?.total_items);
    
    const eventsRes = await instance.get('/events?page_size=1');
    console.log("Events total_items:", eventsRes.data.pagination?.total_items);
    
    const fightsRes = await instance.get('/fights?page_size=1');
    console.log("Fights total_items:", fightsRes.data.pagination?.total_items);
    
    const titlesRes = await instance.get('/titles');
    console.log("Titles length:", titlesRes.data.data?.length);
  } catch (e) {
    console.log(e.message);
  }
}
run();
