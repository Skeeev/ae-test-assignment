import axios, { AxiosInstance } from 'axios';

import { BASE_URL, API_HEADERS } from './constants';

export const apiInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: API_HEADERS
});
