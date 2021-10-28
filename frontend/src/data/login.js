import axios from "axios";
import keys from "../keys.js";

const login = async (username, password, history) => {
    const url = `${keys.apiHost}/login`;

    let axiosConfig = {
        withCredentials: true,
        headers: {"Content-Type":"application/json"}
    }

    try {
        const res = await axios.post(url, {
            username: username,
            password: password,
        }, axiosConfig)
        console.log("Middleware Login res", res)
     
        return res;
    } catch (err) {
        return err.response;
    }
};

export default login;
