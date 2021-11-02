import axios from "axios";
import keys from "../keys.js";

const getUser = async () => {
    const url = `${keys.apiHost}/get-user`;
    let axiosConfig = {
        withCredentials: true,
        headers: {"Content-Type":"application/json"}
    }

    try {
        const res = await axios.post(url, {}, axiosConfig)
        console.log("Middleware Get user res", res)
        return res;
    } catch (err) {
        return err.response;
    }
};

export default getUser;