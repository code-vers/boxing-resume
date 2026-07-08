const axios = require('axios');
const API_KEY = process.env.RAPIDAPI_KEY || '05241ebe2dmshe4b5cbe310c19ccp1503cfjsnfaab61a3cbdd'; 
async function run() {
  const titles = await axios.get('https://boxing-data-api.p.rapidapi.com/v2/titles?page_size=50', {
    headers: { 'x-rapidapi-host': 'boxing-data-api.p.rapidapi.com', 'x-rapidapi-key': API_KEY }
  });
  console.log("TITLES length:", titles.data.data.length, "total_pages:", titles.data.pagination.total_pages);
}
run();
