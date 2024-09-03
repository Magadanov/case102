import axios from "axios";

const instance = axios.create({
    // baseURL: "https://cases.govtec.kz/case102/",
    baseURL: "http://localhost:4000/case102/",
});

export default instance;
