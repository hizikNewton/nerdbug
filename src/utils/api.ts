import axios, { AxiosResponse } from 'axios';

const {
  VITE_COUNTRY_API_URL,
  VITE_COUNTRY_API_ACCESS_KEY,
  VITE_WEATHER_API_URL,
  VITE_WEATHER_API_ACCESS_KEY,
} = import.meta.env;
const api = {
  country: {
    baseUrl: VITE_COUNTRY_API_URL,
    accessKey: VITE_COUNTRY_API_ACCESS_KEY,
  },
  weather: {
    baseUrl: VITE_WEATHER_API_URL,
    accessKey: VITE_WEATHER_API_ACCESS_KEY,
  },
};

const makeRequest = async <T>({
  type,
  method,
  url,
  data,
  headers = {},
}: {
  method: string;
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  headers?: Record<string, string>;
  type: keyof typeof api;
}): Promise<T> => {
  const { baseUrl, accessKey } = api[type];
  const accessKeyString = accessKey?`?access_key=${accessKey}`:""
  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url: `${baseUrl}/${url}${accessKeyString}`,
      data,
      headers,
    });

    // Handle successful response here
    return response.data;
  } catch (error) {
    console.log(error);
    // Handle error here
    throw error;
  }
};

export default makeRequest;
