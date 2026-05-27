import axios from 'axios';

const api = axios.create({

  baseURL:
    'https://mca-memory-wall-mxkv.onrender.com/api'

});

// ================= REQUEST INTERCEPTOR =================

api.interceptors.request.use(

  (config) => {

    const userInfo = JSON.parse(
      localStorage.getItem('userInfo')
    );

    if (userInfo?.token) {

      config.headers.Authorization =
        `Bearer ${userInfo.token}`;

    }

    return config;

  },

  (error) => {

    return Promise.reject(error);

  }

);

// ================= RESPONSE INTERCEPTOR =================

api.interceptors.response.use(

  (response) => {

    return response;

  },

  (error) => {

    // TOKEN EXPIRED / INVALID

    if (
      error.response &&
      error.response.status === 401
    ) {

      localStorage.removeItem('userInfo');

      // Redirect to login

      window.location.href = '/login';

    }

    return Promise.reject(error);

  }

);

export default api;