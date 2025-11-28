import axios from 'axios';

export const profileAxiosInstance = axios.create({
    baseURL: "/api/profiles/",
    headers : {
        'Content-Type': 'application/json',
    },
});

export const eventAxiosInstance = axios.create({
    baseURL: "/api/events/",
    headers : {
        'Content-Type': 'application/json',
    },
});