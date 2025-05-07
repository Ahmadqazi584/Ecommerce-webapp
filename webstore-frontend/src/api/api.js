import axios from 'axios'

// const api = axios.create({
//     baseURL : `${import.meta.env.VITE_BACK_END_URL}/api`,
//     withCredentials: true,
// });

// export default api;


const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default api;  // 👈 Add this default export


// Add response interceptor to handle errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.error('Authentication error - possible cookie issue');
      // Handle logout or redirect if needed
    }
    return Promise.reject(error);
  }
);
