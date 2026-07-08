const axios = require('axios');
const API_KEY = process.env.RAPIDAPI_KEY || '05241ebe2dmshe4b5cbe310c19ccp1503cfjsnfaab61a3cbdd'; // from check-rapidapi.ts

async function run() {
  try {
    const titles = await axios.get('https://boxing-data-api.p.rapidapi.com/v2/titles?page_size=2', {
      headers: {
        'x-rapidapi-host': 'boxing-data-api.p.rapidapi.com',
        'x-rapidapi-key': API_KEY,
      }
    });
    console.log("TITLES", JSON.stringify(titles.data, null, 2));

    const rankings = await axios.get('https://boxing-data-api.p.rapidapi.com/v2/rankings?page_size=2', {
      headers: {
        'x-rapidapi-host': 'boxing-data-api.p.rapidapi.com',
        'x-rapidapi-key': API_KEY,
      }
    });
    console.log("RANKINGS", JSON.stringify(rankings.data, null, 2));

  } catch (e) {
    console.error(e.response ? e.response.data : e.message);
  }
}
run();
