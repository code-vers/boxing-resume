const axios = require('axios');
const API_KEY = process.env.RAPIDAPI_KEY || '05241ebe2dmshe4b5cbe310c19ccp1503cfjsnfaab61a3cbdd';

async function run() {
  try {
    const res = await axios.get('https://boxing-data-api.p.rapidapi.com/v2/fights?page_size=20', {
      headers: {
        'x-rapidapi-host': 'boxing-data-api.p.rapidapi.com',
        'x-rapidapi-key': API_KEY,
      }
    });
    const fightsWithEvent = res.data.data.filter(f => f.event_id);
    console.log(JSON.stringify(fightsWithEvent.slice(0, 1), null, 2));
  } catch (err) {
    console.error(err.message);
  }
}
run();
