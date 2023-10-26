import axios from "axios";

const baseUrl = "http://192.168.178.14:5077/api/";
// const baseUrl = "https://632ee37cb56bd6ac45a69446.mockapi.io/db/";

export const http = axios.create({
    baseURL: baseUrl,
});