const axios = require('axios');
const API_KEY = process.env.RAPIDAPI_KEY || '05241ebe2dmshe4b5cbe310c19ccp1503cfjsnfaab61a3cbdd';

async function run() {
  try {
    const res = await axios.get('https://boxing-data-api.p.rapidapi.com/v2/fights?event_id=699ceb44759c1e4c0dc680d2', {
      headers: {
        'x-rapidapi-host': 'boxing-data-api.p.rapidapi.com',
        'x-rapidapi-key': API_KEY,
      }
    });
    console.log(JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error(err.message);
  }
}
run();
