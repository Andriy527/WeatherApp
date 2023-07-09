import axios from "axios";

const API_URL = "https://api.open-meteo.com/v1";

const $weather = axios.create({
    withCredentials: false,
    baseURL: API_URL
})

export default $weather;