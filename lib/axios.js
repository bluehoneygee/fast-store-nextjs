import axios from "axios";

export const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 10000,
});

export const geocodingApi = axios.create({
  baseURL: "https://api.bigdatacloud.net/data/reverse-geocode-client",
  timeout: 10000,
});
