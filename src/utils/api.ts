import dataType from 'src/types/type';
import makeRequest from './makeRequest';

const { VITE_API_CORS_KEY, VITE_COUNTRY_LIMIT } = import.meta.env;

const fetchCitiesByPopulation = async () => {
  try {
    const res: { data: Array<dataType> } = await makeRequest({
      type: 'country',
      method: 'post',
      url: 'population/cities/filter',
      data: JSON.stringify({
        limit: VITE_COUNTRY_LIMIT,
        order: 'dsc',
        orderBy: 'value',
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    return res.data;
  } catch (error) {
    console.error(error, 'cannot fetch city');
  }
};

const fetchWeatherForCity = async (city: string) => {
  try {
    const res = await makeRequest({
      type: 'weather',
      method: 'get',
      url: 'current',
      data: {
        query: city,
      },
      headers: {
        'Retry-After': 3600,
        'x-cors-api-key': VITE_API_CORS_KEY,
      },
    });
    return res;
  } catch (error) {
    throw new Error(error as string);
  }
};

export { fetchCitiesByPopulation, fetchWeatherForCity };
