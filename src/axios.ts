import axios from 'axios';
import { API_URL } from './utils';

export const API = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});
