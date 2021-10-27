import axios from "axios";
import keys from "../keys.js";

const userInfo = async (token) => {
    const url = `${keys.apiHost}/userInfo`;

    try {
        const res = await axios.post(url, {
            token: token,
            user: {},
        })
        console.log(res)
        return res;
    } catch (err) {
        return err.response;
    }
};

export default userInfo;