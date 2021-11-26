import axios from "axios";
import jwtDecode from "jwt-decode";
const baseURL = "http://localhost:5000/";

var client = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem("token")
        }
});
var refresh = async () => {
    try {
        var res = await axios.post(baseURL + "refresh", { refreshToken: localStorage.getItem("refresh_token")})
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("refresh_token", res.data.refreshToken);
        return res.data.accessToken
    } catch (err) {
        console.log(err)
        return err
    }
}

client.interceptors.request.use(async (config) => {
    try {
        let currentDate = new Date()
        const decodedToken = jwtDecode(localStorage.getItem("token"))
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            const accessToken = await refresh()
            config.headers["authorization"] = "Bearer " + accessToken
        }
        
        return config;
    } catch (err) {
        return err
    }
}
)

export { client };