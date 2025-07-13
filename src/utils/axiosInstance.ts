import axios from "axios";
import { HOST_API_KEY } from "./globalConfig";

const axiosInstance = axios.create({ baseURL: HOST_API_KEY });

axiosInstance.interceptors.request.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "General Axios Error happend"
    )
);

export default axiosInstance;
