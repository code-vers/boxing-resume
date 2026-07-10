import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;

async function testApi() {
  const api = axios.create({
    baseURL: 'https://boxing-data-api.p.rapidapi.com/v2',
    headers: {
      'x-rapidapi-host': 'boxing-data-api.p.rapidapi.com',
      'x-rapidapi-key': API_KEY,
    },
  });

  try {
    const res = await api.get('/rankings?page_num=1');
    const firstItem = res.data.data[0];
    console.log(JSON.stringify(firstItem.rankings.slice(0, 2), null, 2));
  } catch (error: any) {
    console.error('API Error:', error.response?.data || error.message);
  }
}

testApi();
