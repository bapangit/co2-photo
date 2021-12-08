import axios from "axios";
//const baseURL = "http://localhost:5000/";
const baseURL = "https://co2-service.herokuapp.com/";

const openClient = axios.create({
    baseURL: baseURL,
    timeout: 10000
});
export {openClient};