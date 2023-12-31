/* eslint-disable @typescript-eslint/no-explicit-any */
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
  method: 'post' | 'get';
  url: string;
  data?: any;
  headers?: Record<string, any>;
  type: keyof typeof api;
}): Promise<T> => {
  const { baseUrl, accessKey } = api[type];
  let modifiedUrl = url;
  if (type == 'weather' && method === 'get') {
    const queryParams = new URLSearchParams({ access_key: accessKey, ...data });
    modifiedUrl = `${url}?${queryParams}`;
  }
  try {
    const response: AxiosResponse<T> = await axios.request({
      method,
      url: `${baseUrl}/${modifiedUrl}`,
      maxBodyLength: Infinity,
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
