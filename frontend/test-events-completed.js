const axios = require('axios');
const instance = axios.create({
  baseURL: "https://boxing-data-api.p.rapidapi.com/v2",
  headers: {
    'x-rapidapi-host': "boxing-data-api.p.rapidapi.com",
    'x-rapidapi-key': "05241ebe2dmshe4b5cbe310c19ccp1503cfjsnfaab61a3cbdd",
  },
});

instance.get('/events?date_sort=DESC&page_size=50').then(res => {
  const data = res.data.data;
  console.log(`Total events: ${data.length}`);
  const finished = data.filter(e => e.status === 'FINISHED' || e.status === 'COMPLETED');
  console.log(`Finished events: ${finished.length}`);
}).catch(err => console.error(err.message));
