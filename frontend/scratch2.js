const axios = require('axios');
const API_KEY = process.env.RAPIDAPI_KEY || '05241ebe2dmshe4b5cbe310c19ccp1503cfjsnfaab61a3cbdd'; // from check-rapidapi.ts

async function run() {
  try {
    const rankings = await axios.get('https://boxing-data-api.p.rapidapi.com/v2/rankings?page_size=100', {
      headers: {
        'x-rapidapi-host': 'boxing-data-api.p.rapidapi.com',
        'x-rapidapi-key': API_KEY,
      }
    });
    console.log("RANKINGS length:", rankings.data.data.length);
    console.log("total_pages:", rankings.data.pagination.total_pages);
  } catch (e) {
    console.error(e.response ? e.response.data : e.message);
  }
}
run();
