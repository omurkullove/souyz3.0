import axios from 'axios';

export const API = axios.create({
    baseURL: 'https://souyz3-0.vercel.app/api/v1',
    withCredentials: true,
});
