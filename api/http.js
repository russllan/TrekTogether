import axios from "axios";

const baseUrl = "https://app-trektogether-web-eastasia-dev-001.azurewebsites.net/api/";

export const http = axios.create({
    baseURL: baseUrl,
});