import axios from "axios";

const baseUrl = "https://justcode.online/api/";

export const http = axios.create({
    baseURL: baseUrl,
});