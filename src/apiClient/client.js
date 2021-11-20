import axios from "axios";
import jwtDecode from "jwt-decode";
const baseURL = "http://localhost:5000/";

var client = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: { "authorization": JSON.parse(localStorage.getItem("tokens")).accessToken }
});
var refresh = async () => {
    try {
        var res = await axios.post(baseURL + "refresh", { refreshToken: JSON.parse(localStorage.getItem("tokens")).refreshToken })
        localStorage.setItem("tokens", JSON.stringify(res.data));
        console.log(res.data.refreshToken)
        return res.data.accessToken
    } catch (err) {
        console.log(err)
        return err
    }
}

client.interceptors.request.use(async (config) => {
    try {
        let currentDate = new Date()
        const decodedToken = jwtDecode(JSON.parse(localStorage.getItem("tokens")).accessToken)
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