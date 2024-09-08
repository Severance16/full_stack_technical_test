import axios from "axios";
import Cookies from 'js-cookie'

const clientAxios = axios.create({
    baseURL: "http://localhost:4000/api"
})

clientAxios.interceptors.request.use(function (config) {
    const token = Cookies.get("authTokens")
    console.log(config.url)
    // console.log("desde el cliente", token)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
        return config
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  })

export default clientAxios