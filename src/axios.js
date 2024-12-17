// src/axios.js
import axios from 'axios';

// Create an Axios instance with a default base URL
const instance = axios.create({
  baseURL: 'http://localhost:5000', // Change this to your backend URL when deployed
});

export default instance;
