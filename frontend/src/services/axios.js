import axios from "axios";
import { toast } from "react-toastify";

export const devAPI = "http://localhost:8000"
export const productAPI = ""

const axiosInst = axios.create({
  baseURL: devAPI,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInst.defaults.withCredentials = true;

axiosInst.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (error.status === 401) {
      toast.error("Unauthorized or session expired", {
        position: toast.POSITION.TOP_CENTER,
      });
      let redirectProcess = setTimeout(() => {
        window.location.assign("/");
        window.clearTimeout(redirectProcess);
      }, 2000);
      return;
    }

    if (error.status === 500) {
      toast.error("Internal server error", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    return Promise.reject(error);
  }
);

export default axiosInst;