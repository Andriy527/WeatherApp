import axios from "axios";

const API_URL = "https://geocode.maps.co";

const $geo = axios.create({
    withCredentials: false,
    baseURL: API_URL
})

export default $geo;
