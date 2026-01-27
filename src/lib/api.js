import axios from "axios";

const api = axios.create({
    baseURL: "", // same-origin
});

export default api;
