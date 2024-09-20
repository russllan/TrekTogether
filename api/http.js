import axios from "axios";

const baseUrl = "https://trektogether-production.up.railway.app/api/";

export const http = axios.create({
    baseURL: baseUrl,
});