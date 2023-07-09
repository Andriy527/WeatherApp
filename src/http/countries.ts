import axios from "axios";

const API_URL = "https://countriesnow.space/api/v0.1";

const $countries = axios.create({
    withCredentials: false,
    baseURL: API_URL
})

export default $countries;