import axios from 'axios';
import server_url from './server_url'
const API = axios.create({
  baseURL:  server_url
});

export default API;
