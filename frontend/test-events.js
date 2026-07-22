const axios = require('axios');
const instance = axios.create({
  baseURL: "https://boxing-data-api.p.rapidapi.com/v2",
  headers: {
    'x-rapidapi-host': "boxing-data-api.p.rapidapi.com",
    'x-rapidapi-key': "05241ebe2dmshe4b5cbe310c19ccp1503cfjsnfaab61a3cbdd",
  },
});

instance.get('/events?date_sort=DESC&page_size=5').then(res => {
  const data = res.data.data;
  data.forEach((event, i) => {
    console.log(`\nEvent ${i}:`);
    console.log("Date:", event.date);
    console.log("Fights:", event.fights?.length);
    console.log("Fighter 1:", event.fighters?.fighter_1?.fighter_name);
    console.log("Fighter 2:", event.fighters?.fighter_2?.fighter_name);
  });
}).catch(err => console.error(err.message));
