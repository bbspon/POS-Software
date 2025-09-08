import axios from "axios";

// Create an axios instance with default configurations
const apiClient = axios.create({
  baseURL: "https://your-api-endpoint.com", // Replace this with your actual API endpoint
  headers: {
    "Content-Type": "application/json",  // You can adjust headers based on your API
  },
});

// You can also add interceptors here if needed
// For example, to handle requests globally
apiClient.interceptors.request.use(
  (config) => {
    // You can add an Authorization header or handle other logic here
    // For example:
    // config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// And similarly, handle response globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally here
    // Example: Show a global error notification
    return Promise.reject(error);
  }
);

export default apiClient;
