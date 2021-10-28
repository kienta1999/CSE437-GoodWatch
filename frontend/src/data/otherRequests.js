import axios from "axios";
import keys from "../keys.js";

const getUser = async (token) => {
    // const url = `${keys.apiHost}/current-session`;
    const url = `${keys.apiHost}/get-user`;
    try {
        const res = await axios.post(url, {
            token: token
        })
        console.log("Middleware Get user res", res)
        return res;
    } catch (err) {
        return err.response;
    }
};

export default getUser;