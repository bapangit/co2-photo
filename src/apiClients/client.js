import axios from "axios";
import jwtDecode from "jwt-decode";
import {logout} from "../utils/helper"
//const baseURL = "http://localhost:5000/";
const baseURL = "https://co2-service.herokuapp.com/";

var client = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});
var refresh = async () => {
    try {
        var res = await axios.post(baseURL + "refresh", { refreshToken: localStorage.getItem("refresh_token") })
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("refresh_token", res.data.refreshToken);
        return res.data.accessToken
    } catch (err) {
        console.log(err)
        return err
    }
}

client.interceptors.request.use(async (config) => {
    config.headers.Authorization = "Bearer " + localStorage.getItem("token")
    try {
        let currentDate = new Date()
        const decodedToken = jwtDecode(localStorage.getItem("token"))
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            const accessToken = await refresh()
            config.headers.Authorization = "Bearer " + accessToken
            
        }
        return config;
    } catch (err) {
        return err
    }
}
)
client.interceptors.response.use(
    response => response,
    error => {
        if(error.response.status === 401){
            logout()
        }
    }
)

export { client };