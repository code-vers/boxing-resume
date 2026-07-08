const axios = require('axios');
const API_KEY = process.env.RAPIDAPI_KEY || '05241ebe2dmshe4b5cbe310c19ccp1503cfjsnfaab61a3cbdd'; 
async function run() {
  try {
    const fights = await axios.get('https://boxing-data-api.p.rapidapi.com/v2/fights?title_id=67153e83af69bb50508b792f', {
      headers: { 'x-rapidapi-host': 'boxing-data-api.p.rapidapi.com', 'x-rapidapi-key': API_KEY }
    });
    console.log("FIGHTS length:", fights.data.data.length);
  } catch(e) {
    console.error(e.response ? e.response.data : e.message);
  }
}
run();
