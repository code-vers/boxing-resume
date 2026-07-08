const axios = require('axios');

async function testFightersEndpoint() {
  try {
    const res = await axios.get('https://boxing-data-api.p.rapidapi.com/v2/fighters?division_id=671513530ad13034eb88265a&limit=2', {
      headers: {
        'x-rapidapi-host': 'boxing-data-api.p.rapidapi.com',
        'x-rapidapi-key': '05241ebe2dmshe4b5cbe310c19ccp1503cfjsnfaab61a3cbdd'
      }
    });
    console.log(JSON.stringify(res.data, null, 2).substring(0, 1500));
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
  }
}

testFightersEndpoint();
