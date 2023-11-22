import axios from 'axios';

// Create an Axios instance
const Axios = axios.create();

// Create a variable to track the number of active requests
let activeRequests = 0;

// Add a request interceptor
Axios.interceptors.request.use(
  (config) => {
    // Increment the active requests count
    activeRequests++;
    console.log

    // Show loading spinner or indicator
    // You can implement your loading indicator logic here

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
Axios.interceptors.response.use(
  (response) => {
    // Decrement the active requests count
    activeRequests--;

    // If no active requests, hide loading spinner or indicator
    if (activeRequests === 0) {
      // You can implement your loading indicator hiding logic here
    }

    return response;
  },
  (error) => {
    // Decrement the active requests count
    activeRequests--;

    // If no active requests, hide loading spinner or indicator
    if (activeRequests === 0) {
      // You can implement your loading indicator hiding logic here
    }

    // Do something with response error
    return Promise.reject(error);
  }
);

export default Axios;
