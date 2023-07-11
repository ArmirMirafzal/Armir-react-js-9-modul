import axios from "axios";

const baseURL = "https://pdp-movies-78.onrender.com/api";

export const http = axios.create({ baseURL });
