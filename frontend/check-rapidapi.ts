import axios from 'axios';

async function main() {
  const headers = {
    'x-rapidapi-host': 'boxing-data-api.p.rapidapi.com',
    'x-rapidapi-key': '05241ebe2dmshe4b5cbe310c19ccp1503cfjsnfaab61a3cbdd',
  };

  try {
    const res = await axios.get('https://boxing-data-api.p.rapidapi.com/v2/fighters?skip=25', { headers });
    console.log("skip=25 pagination:", res.data.pagination);
    console.log("skip=25 first fighter:", res.data.data[0]?.name);
  } catch (e: any) {
    console.error(e.message);
  }
}

main();
