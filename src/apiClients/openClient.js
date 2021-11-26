import axios from "axios";
const baseURL = "http://localhost:5000/";

var openClient = axios.create({
    baseURL: baseURL,
    timeout: 1000
});
export {openClient};