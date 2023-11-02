import axios from "axios";

const baseUrl = "http://192.168.165.14:5077/api/";

export const http = axios.create({
    baseURL: baseUrl,
});