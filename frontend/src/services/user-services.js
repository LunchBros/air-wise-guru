import axios from "axios";
import axiosInst from "./axios";

const accessLogin = async () => {
    const response = await axios.get("/auth/google", {withCredentials: true})
   
    return response.status()
}


const userServices = {
    accessLogin: accessLogin
}

export default userServices;