import axios from "axios";
import config from "../config";

const axiosInstance = axios.create({
    baseURL: config.API_URL
// >>>>>>> ae5a23604e64274bdad96b8695c60d0b90f0f757
})
export default axiosInstance;