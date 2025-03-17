import axios from "axios"; // Importing axios for making HTTP requests
import { BASE_URL } from "./apiPaths"; // Importing the base URL from apiPaths.js

// Creating an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: BASE_URL, // Set the base URL for all requests
  timeout: 10000, // Set a timeout of 10 seconds for requests
  headers: {
    "Content-Type": "application/json", // Define content type as JSON
    Accept: "application/json", // Define accepted response format
  },
});

// Request Interceptor - Modifies every request before sending it
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token"); // Retrieve token from local storage

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // Attach token to request headers
    }

    return config; // Return the updated request config
  },
  (error) => {
    return Promise.reject(error); // Reject the request if there's an error
  }
);

// Response Interceptor - Handles responses and errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // Return the response if successful
  },
  (error) => {
    // Check if the response has an error status
    if (error.response) {
      if (error.response.status === 401) {
        // If unauthorized (401), redirect user to login page
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        // If server error (500), log an error message
        console.error("Server error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      // If request times out, log a timeout message
      console.error("Request timeout. Please try again.");
    }

    return Promise.reject(error); // Reject the response if there's an error
  }
);

export default axiosInstance; // Export the configured Axios instance
