import axios, { AxiosResponse } from 'axios';

const {
  REACT_APP_COUNTRY_API_URL,
  REACT_APP_COUNTRY_API_ACCESS_KEY,
  REACT_APP_WEATHER_API_URL,
  REACT_APP_WEATHER_API_ACCESS_KEY,
} = process.env;

const api = {
  country: {
    baseUrl: REACT_APP_COUNTRY_API_URL,
    accessKey: REACT_APP_COUNTRY_API_ACCESS_KEY,
  },
  weather: {
    baseUrl: REACT_APP_WEATHER_API_URL,
    accessKey: REACT_APP_WEATHER_API_ACCESS_KEY,
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
  data?: any;
  headers?: Record<string, string>;
  type: keyof typeof api;
}): Promise<T> => {
  const { baseUrl, accessKey } = api[type];
  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url: `${baseUrl}/${url}?access_key=${accessKey}`,
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
