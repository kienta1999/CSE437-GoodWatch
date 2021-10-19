import axios from "axios";
import keys from "../keys.js";

const login = async (username, password, history) => {
    const url = `${keys.apiHost}/login`;

    try {
        const res = await axios.post(url, {
            username: username,
            password: password,
        })
        history.push("/");
        return res;
    } catch (err) {
        return err.response;
    }
};

export default login;
