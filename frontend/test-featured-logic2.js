const axios = require('axios');
const instance = axios.create({
  baseURL: "https://boxing-data-api.p.rapidapi.com/v2",
  headers: {
    'x-rapidapi-host': "boxing-data-api.p.rapidapi.com",
    'x-rapidapi-key': "05241ebe2dmshe4b5cbe310c19ccp1503cfjsnfaab61a3cbdd",
  },
});

async function run() {
  const res = await instance.get(`/fighters/6715fc1faf69bb50508b7c12`);
  console.log(JSON.stringify(res.data, null, 2));
}
run();
